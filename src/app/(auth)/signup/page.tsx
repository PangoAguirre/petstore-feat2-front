"use client";

import { Info } from "@/components/common/Info";
import { FieldConfigs, PartialForm } from "@/components/common/PartialForm";
import { useSignUpMutation } from "@/lib/graphql/codegen";
import { createSchema, pwReqMessage, pwRequirements } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function SignUp() {
  const router = useRouter();
  const [signup, { loading }] = useSignUpMutation({
    onCompleted: () => {
      toast.success("Registro exitoso!");
      router.push("/login");
    },
  });

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordAgain: "",
    },
    resolver: zodResolver(
      createSchema(fields).refine(
        (data) => data.password == data.passwordAgain,
        { path: ["passwordAgain"], message: "Las contraseñas no coinciden" },
      ),
    ),
    mode: "onChange",
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.8, bounce: 0 }}
      className="p-16"
    >
      <FormProvider {...form}>
        <PartialForm
          loading={loading}
          onAction={(data) => {
            signup({
              variables: {
                email: data.email,
                nombre: data.fullName,
                password: data.password,
              },
            });
          }}
          fields={fields}
          btnText="Registrarse"
          leftInfo={
            <Info
              title="Formulario de Registro"
              desc="¿Quiéres estár al día en nuestros tips y noticias?"
            />
          }
        />
      </FormProvider>
    </motion.div>
  );
}

const fields: FieldConfigs = {
  fullName: {
    label: "Nombre completo",
    placeholder: "Ingrese su nombre completo",
  },
  email: {
    label: "Correo electrónico",
    placeholder: "ejemplo@correo.com",
    ztype: z.string().email({ message: "Ingrese un email válido" }),
  },
  password: {
    label: "Contraseña",
    placeholder: "Ingrese su contraseña",
    type: "password",
    ztype: z.string().refine(pwRequirements, {
      message: pwReqMessage,
    }),
  },
  passwordAgain: {
    label: "Confirmación de contraseña",
    placeholder: "Repita su contraseña",
    type: "password",
    ztype: z.string().nonempty({ message: "Requerido" }),
  },
};
