"use client";
import { MediumTitle, SmallTextDefault } from "@/components/atoms/heroTitle";
import RegisterForm from "@/components/atoms/registerForm";
import ButtomYe from "@/components/atoms/buttomYe";
import { useState } from "react";
import axios, { HttpStatusCode } from "axios";
import { toast } from "sonner";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const sendRecoveryEmail = () => {
    setSending(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/password/request-reset`, {
        email,
      })
      .then((res) => {
        if (res.status == HttpStatusCode.Ok) {
          toast.info("Email envíado", { description: res.data.message });
        } else {
          toast.error("No fue posible enviar el email");
          console.error(res.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error", { description: err.response.data.message });
        } else {
          toast.error("Error", {
            description: "No fue posible enviar el email, intente más tarde.",
          });
          console.error(err);
        }
      })
      .finally(() => setSending(false));
  };

  return (
    <div className="w-full h-100 flex justify-center items-center gap-30">
      <div>
        <div className="font-bold">
          <MediumTitle text="Restablecer tu contraseña" />
        </div>
        <SmallTextDefault text="Por favor, ingresa tu correo electrónico para recibir instrucciones." />
      </div>
      <form
        className="flex flex-col gap-7"
        onSubmit={(e) => {
          e.preventDefault();
          sendRecoveryEmail();
        }}
      >
        <RegisterForm
          title="Correo Electrónico"
          holder="tu_correo@ejemplo.com"
          text="Te enviaremos un enlace para restablecer tu contraseña."
          value={email}
          setValue={setEmail}
        />
        <ButtomYe type="submit" text="Enviar instrucciones" loading={sending} />
      </form>
    </div>
  );
}
