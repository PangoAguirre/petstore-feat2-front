"use client";
import { Info } from "@/components/common/Info";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "motion/react";
import { createDefaultValues, createSchema } from "@/lib/utils";
import { PartialForm } from "@/components/common/PartialForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminCreationFields } from "@/lib/forms/admin";

export default function InitialConfig() {
  const [showForm, setShowForm] = useState(false);
  const form = useForm({
    defaultValues: createDefaultValues(adminCreationFields),
    resolver: zodResolver(createSchema(adminCreationFields)),
    mode: "onChange",
  });

  return showForm ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.8, bounce: 0 }}
      className="h-full w-full flex flex-col grow items-center p-16 gap-12"
    >
      <FormProvider {...form}>
        <PartialForm
          leftInfo={
            <h1 className="text-4xl font-bold text-center">
              Crear Primer Administrador
            </h1>
          }
          onAction={() => console.log("TODO: ", form.getValues())}
          fields={adminCreationFields}
          btnText="Crear Administrador"
        />
      </FormProvider>
    </motion.div>
  ) : (
    <div className="p-16">
      <Info
        title="Configuración Inicial"
        desc="Crea tu primer administrador para comenzar a gestionar la tienda de mascotas."
      >
        <Button onClick={() => setShowForm(true)}>Crear administrador</Button>
      </Info>
    </div>
  );
}
