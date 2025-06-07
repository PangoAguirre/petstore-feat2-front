import { MediumTitle, SmallTextDefault } from "@/components/atoms/heroTitle";
import RegisterForm from "@/components/atoms/registerForm";
import ButtomYe from "@/components/atoms/buttomYe";

export default function RecoverPassword() {
  return (
    <div className="w-full h-100 flex justify-center items-center gap-30">
      <div>
        <div className="font-bold">
          <MediumTitle text="Restablecer tu contraseña" />
        </div>
        <SmallTextDefault text="Por favor, ingresa tu correo electrónico para recibir instrucciones." />
      </div>
      <div className="flex flex-col gap-7">
        <RegisterForm
          title="Correo Electrónico"
          holder="tu_correo@ejemplo.com"
          text="Te enviaremos un enlace para restablecer tu contraseña."
        />
        <ButtomYe text="Enviar instrucciones" />
      </div>
    </div>
  );
}
