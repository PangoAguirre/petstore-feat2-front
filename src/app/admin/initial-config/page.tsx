"use client";
import { Info } from "@/components/common/Info";
import { BasicForm, FieldConfig } from "@/components/suppliers/BasicForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "motion/react";

export default function InitialConfig() {
  const [showForm, setShowForm] = useState(false);

  const fields: FieldConfig[] = [
    {
      id: "username",
      label: "Nombre de Usuario",
      placeholder: "Introduce tu nombre de usuario",
      rules: { required: true, minLength: 3 },
    },
    {
      id: "email",
      label: "Correo Electrónico",
      placeholder: "Introduce tu correo electrónico",
      rules: { required: true, minLength: 3 },
    },
    {
      id: "password",
      label: "Contraseña",
      placeholder: "Introduce tu contraseña",
      hint: "Máximo 100 caracteres",
      rules: { required: true, maxLength: 100 },
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
