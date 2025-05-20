"use client";

import { Info } from "@/components/common/Info";
import { FieldConfigs, PartialForm } from "@/components/common/PartialForm";
import { Button } from "@/components/ui/button";
import {
  createDefaultValues,
  createSchema,
  pwReqMessage,
  pwRequirements,
} from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {
  const form = useForm({
    defaultValues: createDefaultValues(fields),
    resolver: zodResolver(createSchema(fields)),
    mode: "onChange",
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.8, bounce: 0 }}
      className="flex flex-col gap-16 p-16"
    >
      <FormProvider {...form}>
        <PartialForm
          onAction={(data) => {
            console.log(data);
          }}
          fields={fields}
          leftInfo={
            <Info
              title="¡Bienvenido de nuevo!"
              desc="Por favor, inicia sesión utilizando tus credenciales."
            />
          }
        >
          <div className="grid grid-cols-2 justify-stretch gap-4">
            <Button className="py-5 px-12" variant={"outline"}>
              ¿Olvidaste tu contraseña?
            </Button>
            <Button
              className="py-5 px-12"
              onClick={() => console.log(form.getValues())}
            >
              Iniciar sesión
            </Button>
          </div>
        </PartialForm>
      </FormProvider>
      <Info
        title="Registrar Cuenta"
        desc="Únete a nuestra comunidad de amantes de las mascotas. Crea tu cuenta para disfrutar de nuestros servicios."
      >
        <Button className="py-5 px-12" asChild>
          <Link href={"/signup"}>Registrarse</Link>
        </Button>
      </Info>
    </motion.div>
  );
}

const fields: FieldConfigs = {
  email: {
    label: "Correo Electrónico",
    placeholder: "tucorreo@ejemplo.com",
    type: "email",
    ztype: z.string().email({ message: "Ingrese un correo válido" }),
  },
  password: {
    label: "Contraseña",
    type: "password",
    ztype: z.string().refine(pwRequirements, { message: pwReqMessage }),
  },
};
