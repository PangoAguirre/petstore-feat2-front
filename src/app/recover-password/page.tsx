"use client";
import { MediumTitle, SmallTextDefault } from "@/components/atoms/heroTitle";
import RegisterForm from "@/components/atoms/registerForm";
import ButtomYe from "@/components/atoms/buttomYe";
import { useEffect, useState } from "react";
import { AxiosError, HttpStatusCode } from "axios";
import { toast } from "sonner";
import { restClient } from "../api/client";
import { useSearchParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { NewPassword } from "@/components/auth/NewPassword";
import { useMutation } from "react-query";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const { mutate: sendRecoveryEmail, isLoading: sending } = useMutation({
    mutationKey: ["requestReset"],
    mutationFn: () =>
      restClient.post("/password/request-reset", {
        email,
      }),
    onError: (err: AxiosError) => {
      if (err.response) {
        toast.error("Error", {
          description: (err.response.data as any).message,
        });
      } else {
        toast.error("Error", {
          description: "No fue posible enviar el email, intente más tarde.",
        });
        console.error(err);
      }
    },
    onSuccess: (res) => {
      if (res.status == HttpStatusCode.Ok) {
        toast.info("Email envíado", { description: res.data.message });
      } else {
        toast.error("No fue posible enviar el email");
        console.error(res.data);
      }
    },
  });
  const params = useSearchParams();
  const [tokenStatus, setTokenStatus] = useState<
    undefined | "validating" | "valid" | "invalid"
  >();

  const token = params.get("token");

  useEffect(() => {
    console.log(token);
    if (token && token.toString().length > 0) {
      setTokenStatus("validating");
      restClient
        .get("/password/validate", { params: { token: token } })
        .then((res) =>
          setTokenStatus(res.data.valid == true ? "valid" : "invalid"),
        )
        .catch(() => {
          toast.error("Token inválido");
          setTokenStatus("invalid");
        });
    }
  }, [token]);

  if (tokenStatus === "validating") {
    return (
      <div>
        <Loader2Icon className="animate-spin m-auto" />
      </div>
    );
  }
  if (token && tokenStatus === "valid") return <NewPassword token={token} />;

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
