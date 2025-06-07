"use client";

import { Info } from "@/components/common/Info";
import { FieldConfigs, PartialForm } from "@/components/common/PartialForm";
import { Button } from "@/components/ui/button";
import { createDefaultValues, createSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { motion } from "motion/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
            setLoading(true);
            signIn("credentials", {
              redirect: false,
              email: data.email,
              password: data.password,
            })
              .then((res) => {
                if (!res?.ok) {
                  toast.error(res?.error);
                } else {
                  router.push("/dashboard");
                }
              })
              .catch((err) => console.error(err))
              .finally(() => {
                setLoading(false);
              });
          }}
          fields={fields}
          leftInfo={
            <Info
              title="¡Bienvenido de nuevo!"
              desc="Por favor, inicia sesión utilizando tus credenciales."
            />
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-stretch gap-4">
            <Button
              className="py-5 px-12"
              variant={"outline"}
              disabled={loading}
            >
              ¿Olvidaste tu contraseña?
            </Button>
            <Button
              className="py-5 px-12 transition-all ease-out"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </div>
        </PartialForm>
      </FormProvider>
      <Info
        title="Registrar Cuenta"
        desc="Únete a nuestra comunidad de amantes de las mascotas. Crea tu cuenta para disfrutar de nuestros servicios."
      >
        <Button className="py-5 px-12" disabled={loading} asChild>
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
    ztype: z.string().min(4, { message: "Ingrese al menos 4 carácteres." }),
  },
};
