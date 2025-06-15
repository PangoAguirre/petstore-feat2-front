"use client";

import { SingleForm } from "@/components/common/SingleForm";
import { ProductsCatalog } from "@/components/products/ProductsCatalog";
import { SupplierDeletion } from "@/components/suppliers/SupplierDeletion";
import { Separator } from "@/components/ui/separator";
import {
  contactInfoFields,
  generalInfoFields,
  paymentConditionsFields,
} from "@/lib/forms/suppliers";
import {
  useGetSupplierByIdQuery,
  useNewPaymentConditionMutation,
  useUpdatePaymentConditionMutation,
  useUpdateSupplierContactMutation,
  useUpdateSupplierGeneralInfoMutation,
} from "@/lib/graphql/codegen";
import { ValuesFromConfig } from "@/lib/utils";
import { ApolloError } from "@apollo/client";
import { format } from "date-fns";
import { Loader2Icon } from "lucide-react";
import { motion } from "motion/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export default function SupplierDetails() {
  const { id } = useParams();
  const { data: userData } = useSession();

  const { data, loading, refetch } = useGetSupplierByIdQuery({
    context: { serviceName: "suppliers" },
    variables: { id: id!.toString() },
  });

  const [saveGeneralInfo, { loading: savingGeneralInfo }] =
    useUpdateSupplierGeneralInfoMutation({
      context: { serviceName: "suppliers" },
    });
  const [saveContact, { loading: savingContact }] =
    useUpdateSupplierContactMutation({
      context: { serviceName: "suppliers" },
    });
  const [saveConditions, { loading: savingConditions }] =
    useUpdatePaymentConditionMutation({
      context: { serviceName: "suppliers" },
    });
  const [createCondition, { loading: creatingCondition }] =
    useNewPaymentConditionMutation({
      context: { serviceName: "suppliers" },
    });

  if (!data || !data.getProveedorById) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        {loading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <span>No se encontraron datos del proveedor.</span>
        )}
      </div>
    );
  }

  const userId = userData?.user.id;
  const supplierInfo = data.getProveedorById;

  const onSuccess = () => toast.success("Datos guardados exitosamente!");
  const onError = (err: string) =>
    toast.error("Error al intentar guardar los datos.", { description: err });
  const handlePartialSave = (
    what: "general" | "contact" | "conditions",
    vals: FieldValues,
  ) => {
    let values;
    switch (what) {
      case "general":
        values = vals as ValuesFromConfig<typeof generalInfoFields>;
        saveGeneralInfo({
          variables: {
            id: id!.toString(),
            nit: values.nit,
            nombre: values.name,
          },
        })
          .then(() => {
            refetch();
            onSuccess();
          })
          .catch((err: ApolloError) => {
            onError(err.message);
          });
        break;

      case "contact":
        values = vals as ValuesFromConfig<typeof contactInfoFields>;
        saveContact({
          variables: {
            id: id!.toString(),
            direccion: values.address,
            email: values.email,
            telefono: values.phone,
          },
        })
          .then(() => onSuccess())
          .catch((err: ApolloError) => {
            onError(err.message);
          });
        break;

      case "conditions":
        values = vals as ValuesFromConfig<typeof paymentConditionsFields>;
        if (
          data.getProveedorById?.condicionesPago &&
          data.getProveedorById?.condicionesPago[0]
        ) {
          saveConditions({
            variables: {
              idCondicionPago:
                data.getProveedorById?.condicionesPago[0]?.idCondicionPago,
              diasCredito: parseInt(values.creditDays),
              fechaInicio: format(values.startDate, "yyyy-MM-dd"),
              fechaFin: format(values.endDate, "yyyy-MM-dd"),
              nota: values.grade,
            },
          })
            .then(() => onSuccess())
            .catch((err: ApolloError) => {
              onError(err.message);
            });
        } else if (userId) {
          createCondition({
            variables: {
              idProveedor: id!.toString(),
              input: {
                idUsuario: userId,
                diasCredito: parseInt(values.creditDays),
                fechaInicio: format(values.startDate, "yyyy-MM-dd"),
                fechaFin: format(values.endDate, "yyyy-MM-dd"),
                nota: values.grade,
              },
            },
          })
            .then(() => onSuccess())
            .catch((err: ApolloError) => {
              onError(err.message);
            });
        } else {
          console.log("User not logged in");
        }
        break;

      default:
        what satisfies never;
        break;
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-8 p-8"
      initial={{ x: "-10%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
    >
      <div className="flex justify-around items-baseline gap-8 w-2/3">
        <div className="bg-gray-300 aspect-square rounded-full p-4">
          <span className="text-4xl">🏪</span>
        </div>
        <h1 className="w-[60%] text-left font-bold text-2xl">
          {data?.getProveedorById?.nombre}
        </h1>
        {data.getProveedorById.activo ? (
          <SupplierDeletion
            id={id!.toString()}
            name={data.getProveedorById.nombre ?? "Sin nombre"}
          />
        ) : (
          <span className="text-destructive">
            Este proveedor se ha desactivado
          </span>
        )}
      </div>
      {data.getProveedorById.activo && (
        <>
          <Separator />
          <SingleForm
            fields={generalInfoFields}
            values={{
              name: supplierInfo.nombre,
              nit: supplierInfo.nit,
            }}
            info={{
              title: "Datos Generales",
              desc: "Información básica sobre el proveedor.",
            }}
            btnText="Guardar"
            loading={savingGeneralInfo}
            onAction={(data) => handlePartialSave("general", data)}
          />
          <Separator />
          <SingleForm
            fields={contactInfoFields}
            values={{
              phone: supplierInfo.telefono,
              email: supplierInfo.email,
              address: supplierInfo.direccion,
            }}
            info={{
              title: "Datos de Contacto",
              desc: "Información de contacto del proveedor.",
            }}
            btnText="Guardar"
            loading={savingContact}
            onAction={(data) => handlePartialSave("contact", data)}
          />
          <Separator />
          <SingleForm
            fields={paymentConditionsFields}
            values={
              supplierInfo.condicionesPago
                ? {
                    creditDays:
                      supplierInfo.condicionesPago[0]?.diasCredito ?? 0,
                    startDate: supplierInfo.condicionesPago[0]?.fechaInicio,
                    endDate: supplierInfo.condicionesPago[0]?.fechaFin,
                    grade: supplierInfo.condicionesPago[0]?.nota ?? "",
                  }
                : {}
            }
            info={{
              title: "Condiciones de Pago",
              desc: "Detalles sobre las condiciones de pago.",
            }}
            btnText="Guardar"
            loading={savingConditions || creatingCondition}
            onAction={(data) => handlePartialSave("conditions", data)}
          />
          <Separator />
          <ProductsCatalog supplierId={id!.toString()} />
        </>
      )}
    </motion.div>
  );
}
