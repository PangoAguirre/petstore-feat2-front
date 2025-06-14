"use client";

import { Info } from "@/components/common/Info";
import { PartialForm } from "@/components/common/PartialForm";
import { NewProduct } from "@/components/products/NewProduct";
import { ProductCard } from "@/components/products/ProductCard";
import { StepScreen } from "@/components/suppliers/StepScreen";
import { Summary } from "@/components/suppliers/Summary";
import { Button } from "@/components/ui/button";
import {
  contactInfoFields,
  generalInfoFields,
  paymentConditionsFields,
} from "@/lib/forms/suppliers";
import { useNewSupplierMutation } from "@/lib/graphql/codegen";
import { createDefaultValues, createSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClassNameValue } from "tailwind-merge";

export default function NewSupplier() {
  const [createSupplier, {}] = useNewSupplierMutation({
    context: { serviceName: "suppliers" },
    onError: ({ graphQLErrors }) => {
      if (graphQLErrors.length > 0) {
        graphQLErrors.forEach((e) =>
          toast.error("Error", { description: e.message }),
        );
      } else {
        toast.error("Error", {
          description:
            "Ha ocurrido un error al hacer la solicitud, intente más tarde o contacte con un administrador.",
        });
      }
    },
    onCompleted: () => {
      toast.success("Proveedor creado exitosamente!");
      setStep(1);
      form.reset();
    },
  });
  const { data } = useSession();

  const [step, setStep] = useState(1);
  const [showProductForm, setShowProductForm] = useState(false);
  const allFields = {
    ...generalInfoFields,
    ...contactInfoFields,
    ...paymentConditionsFields,
  };

  const form = useForm({
    defaultValues: {
      ...createDefaultValues(allFields),
      products: [],
    },
    resolver: zodResolver(createSchema(allFields)),
    mode: "onChange",
  });

  const { append } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const nextStep = () => setStep((s) => s + 1);

  const handleSubmit = () => {
    const values = form.getValues();

    createSupplier({
      variables: {
        nombre: values.name,
        nit: values.nit,
        email: values.email,
        direccion: values.address,
        telefono: values.phone,
        idUsuarioCreador: data!.user.id,
        productos: values.products.map((p: Record<string, unknown>) => ({
          codigo: p.code,
          nombre: p.name,
          descripcion: p.description,
          precio: parseFloat(p.price as string),
        })),
        condicionesPago: {
          idUsuario: data!.user.id,
          nota: values.grade,
          diasCredito: parseInt(values.creditDays),
          fechaInicio: format(values.startDate, "yyyy-MM-dd"),
          fechaFin: format(values.endDate, "yyyy-MM-dd"),
        },
      },
    });
  };

  const innerDivCn: ClassNameValue =
    "grid grid-cols-2 justify-around items-center px-4 gap-16 w-full";

  return (
    <FormProvider {...form}>
      <div className="flex flex-col w-full h-full p-12 overflow-x-hidden">
        <StepScreen show={step == 1}>
          <Info
            title="Agregar proveedor"
            desc="Por favor, completa la información necesaria para registrar un nuevo proveedor."
          />

          <PartialForm
            leftInfo={
              <Info
                title="Paso 1 - Datos Generales"
                desc="Ingrese los datos generales del proveedor."
              />
            }
            onAction={nextStep}
            fields={generalInfoFields}
          />
        </StepScreen>

        <StepScreen show={step == 2}>
          <Info
            title="Paso 2 – Productos Asociados"
            desc="¿Qué productos ofrece este proveedor?"
          >
            <Button variant={"outline"}>Eliminar Producto</Button>
            <Button onClick={() => setShowProductForm(true)}>
              Agregar Producto
            </Button>
          </Info>
          <div className={innerDivCn}>
            <Info title="Lista de Productos">
              <Button onClick={() => nextStep()}>Siguiente</Button>
              <Button>Guardar Productos</Button>
            </Info>
            <div className="flex flex-wrap gap-4">
              {form
                .getValues("products")
                .map((p: Record<string, unknown>, idx: number) => (
                  <ProductCard
                    key={idx}
                    info={{
                      code: p.code as string,
                      name: p.name as string,
                      description: p.description as string,
                      price: p.price as number,
                    }}
                  />
                ))}
            </div>
          </div>
          <NewProduct
            open={showProductForm}
            onOpenChange={setShowProductForm}
            onSubmit={(data) => {
              append(data);
              setShowProductForm(false);
            }}
            onCancel={() => setShowProductForm(false)}
          />
        </StepScreen>

        <StepScreen show={step == 3}>
          <Info
            title="Paso 3 – Información de Contacto"
            desc="Proporcione la información de contacto del proveedor."
          />
          <PartialForm
            leftInfo={<Info title="Contacto" />}
            onAction={nextStep}
            fields={contactInfoFields}
          />
        </StepScreen>

        <StepScreen show={step == 4}>
          <Info
            title="Paso 4 – Condiciones de Pago"
            desc="Defina las condiciones de pago con el proveedor."
          />
          <PartialForm
            leftInfo={<Info title="Condiciones de Pago" />}
            onAction={nextStep}
            fields={paymentConditionsFields}
          />
        </StepScreen>

        <StepScreen show={step == 5}>
          <Info
            title="Resumen de Proveedor"
            desc="Revise toda la información ingresada antes de finalizar."
          >
            <Button variant={"outline"} onClick={() => setStep(1)}>
              Volver a Revisar
            </Button>
            <Button onClick={handleSubmit}>Finalizar</Button>
          </Info>
          <div className={innerDivCn}>
            <Info title="Revisión Final" />
            <Summary info={form.getValues()} />
          </div>
        </StepScreen>
      </div>
    </FormProvider>
  );
}
