"use client";

import { Info } from "@/components/common/Info";
import { SingleForm } from "@/components/common/SingleForm";
import { supplierManagerFields } from "@/lib/forms/admin";

export default function NewSupplierManager() {
  return (
    <div className="flex flex-col grow items-center gap-12">
      <Info
        title="Crear Gestor de Proveedores"
        desc="Por favor, complete los detalles a continuación para crear un nuevo gestor de proveedores."
      />
      <SingleForm
        btnText="Crear Usuario"
        info={{ title: "Detalles del Usuario" }}
        fields={supplierManagerFields}
        onAction={(data) => {
          console.log(data);
        }}
      />
    </div>
  );
}
