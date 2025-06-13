"use client";

import { Info } from "@/components/common/Info";
import { PartialForm } from "@/components/common/PartialForm";
import { signupFields } from "@/lib/forms/auth";
import { useSignUpMutation } from "@/lib/graphql/codegen";
import { createSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

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
      createSchema(signupFields).refine(
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
          fields={signupFields}
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
