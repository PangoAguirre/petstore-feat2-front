"use client";
import { Info } from "@/components/common/Info";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "motion/react";
import { z } from "zod";
import { createDefaultValues, createSchema, pwRequirements } from "@/lib/utils";
import { FieldConfigs, PartialForm } from "@/components/common/PartialForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function InitialConfig() {
  const [showForm, setShowForm] = useState(false);
  const form = useForm({
    defaultValues: createDefaultValues(fields),
    resolver: zodResolver(createSchema(fields)),
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
          fields={fields}
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

const fields: FieldConfigs = {
  username: {
    label: "Nombre de Usuario",
    placeholder: "Introduce tu nombre de usuario",
  },

  email: {
    label: "Correo Electrónico",
    placeholder: "Introduce tu correo electrónico",
    ztype: z.string().email(),
  },

  password: {
    label: "Contraseña",
    placeholder: "Introduce tu contraseña",
    hint: "Máximo 100 caracteres",
    type: "password",
    ztype: z.string().refine(pwRequirements, {
      message:
        "La contraseña debe tener al menos 7 caracteres, una letra mayúscula y un carácter especial.",
    }),
  },
};
