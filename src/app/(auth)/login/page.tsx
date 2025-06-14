"use client";

import { Info } from "@/components/common/Info";
import { SingleForm } from "@/components/common/SingleForm";
import { Button } from "@/components/ui/button";
import { loginFields } from "@/lib/forms/auth";
import { LoaderCircle } from "lucide-react";
import { motion } from "motion/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.8, bounce: 0 }}
      className="flex flex-col gap-16 p-16"
    >
      <SingleForm
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
                setTimeout(() => {
                  router.push("/dashboard");
                }, 200);
              }
            })
            .catch((err) => console.error(err))
            .finally(() => {
              setLoading(false);
            });
        }}
        fields={loginFields}
        info={{
          title: "¡Bienvenido de nuevo!",
          desc: "Por favor, inicia sesión utilizando tus credenciales.",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-stretch gap-4">
          <Button
            className="py-5 px-12"
            variant={"outline"}
            disabled={loading}
            type="button"
            onClick={() => router.push("/recover-password")}
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
      </SingleForm>
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
