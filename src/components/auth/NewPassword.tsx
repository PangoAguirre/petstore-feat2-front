import { newPasswordFields } from "@/lib/forms/auth";
import { SingleForm } from "../common/SingleForm";
import { createSchema } from "@/lib/utils";
import { useMutation } from "react-query";
import { restClient } from "@/app/api/client";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export function NewPassword({ token }: { token: string }) {
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["newPassword"],
    mutationFn: (body: { token: string; newPassword: string }) =>
      restClient.post("/password/reset", body),
    onError: (err: AxiosError) => {
      let msg = undefined;
      if (err.response?.data) {
        msg = (err.response.data as any).message;
      } else {
        msg = err.message;
      }
      toast.error("Error al restablecer la contraseña", {
        description: err.message,
      });
    },
    onSuccess: () => {
      toast.success("Contraseña restablecida!", {
        description: "Vuelva a iniciar sesión.",
      });
      router.push("/login");
    },
  });

  return (
    <div className="p-26">
      <SingleForm
        fields={newPasswordFields}
        info={{
          title: "Nueva Contraseña",
          desc: "Ingresa y confirma tu nueva contraseña.",
        }}
        schema={createSchema(newPasswordFields).refine(
          (data) => {
            return data.password === data.passwordAgain;
          },
          { path: ["passwordAgain"], message: "Las contraseñas no coinciden." },
        )}
        btnText="Restablecer Contraseña"
        loading={isLoading}
        onAction={(data) => {
          mutate({ token: token, newPassword: data.password });
        }}
      />
    </div>
  );
}
