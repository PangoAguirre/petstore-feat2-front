"use client";
import { Info } from "@/components/common/Info";
import { BasicForm, FieldConfig } from "@/components/suppliers/BasicForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "motion/react";
import { z } from "zod";

export default function InitialConfig() {
  const [showForm, setShowForm] = useState(false);

  const fields: FieldConfig[] = [
    {
      id: "username",
      label: "Nombre de Usuario",
      placeholder: "Introduce tu nombre de usuario",
      required: true,
    },
    {
      id: "email",
      label: "Correo Electrónico",
      placeholder: "Introduce tu correo electrónico",
      required: true,
      type: z.string().email(),
    },
    {
      id: "password",
      label: "Contraseña",
      placeholder: "Introduce tu contraseña",
      hint: "Máximo 100 caracteres",
      required: true,
      type: z.string().refine(
        (pass) => {
          return (
            pass.length >= 7 &&
            pass.match(/.*[A-Z].*/) &&
            pass.match(/.*[^a-zA-Z0-9].*/)
          );
        },
        {
          message:
            "La contraseña debe tener al menos 7 caracteres, una letra mayúscula y un carácter especial.",
        },
      ),
    },
  ];

  return showForm ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.8, bounce: 0 }}
      className="h-full w-full flex flex-col grow items-center gap-12"
    >
      <div className="h-full grid grid-cols-2 justify-around items-center px-16 gap-20">
        <h1 className="text-4xl font-bold">Crear Primer Administrador</h1>
        <BasicForm
          onSubmit={() => alert("submit")}
          fields={fields}
          btnText="Crear Administrador"
        />
      </div>
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
