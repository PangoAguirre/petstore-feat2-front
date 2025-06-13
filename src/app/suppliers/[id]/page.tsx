"use client";

import NotFound from "@/app/not-found";
import { SingleForm } from "@/components/common/SingleForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  contactInfoFields,
  generalInfoFields,
  paymentConditionsFields,
} from "@/lib/forms/suppliers";
import { useGetSupplierByIdQuery } from "@/lib/graphql/codegen";
import { Loader2Icon } from "lucide-react";
import { motion } from "motion/react";
import { useParams } from "next/navigation";

export default function SupplierDetails() {
  const { id } = useParams();
  const { data, loading } = useGetSupplierByIdQuery({
    context: { serviceName: "suppliers" },
    variables: { id: id!.toString() },
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

  const supplierInfo = data.getProveedorById;

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
        <Button variant={"destructive"}>Eliminar Proveedor</Button>
      </div>
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
        onAction={(data) => alert(JSON.stringify(data))}
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
        onAction={(data) => alert(JSON.stringify(data))}
      />
      <Separator />
      <SingleForm
        fields={paymentConditionsFields}
        values={
          supplierInfo.condicionesPago
            ? {
                creditDays: supplierInfo.condicionesPago[0]?.diasCredito ?? 0,
                startDate: supplierInfo.condicionesPago[0]?.fechaInicio,
                endDate: supplierInfo.condicionesPago[0]?.fechaFin,
                grade: supplierInfo.condicionesPago[0]?.nota,
              }
            : {}
        }
        info={{
          title: "Condiciones de Pago",
          desc: "Detalles sobre las condiciones de pago.",
        }}
        btnText="Guardar"
        onAction={(data) => alert(JSON.stringify(data))}
      />
    </motion.div>
  );
}
