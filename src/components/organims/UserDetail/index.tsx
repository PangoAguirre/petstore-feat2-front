import React from "react";
import RegisterForm from "@/components/atoms/registerForm";
import RegisterFromBold from "@/components/atoms/registerFormBold";
import ButtomCrear from "@/components/atoms/buttomCrear";
import { HeroTitle } from "@/components/atoms/heroTitle";

const index = () => {
  return (
    <div>
    <div className="flex justify-center items-center gap-40  w-screen h-130">
      <div>
        <HeroTitle text="Detalles de usuario"></HeroTitle>
      </div>
      <div>
        <div className="flex flex-col gap-7">
          <RegisterForm
            title="Nombre de Usuario"
            holder="Ingrese el nombre de usuario"
            text="Máx. 100 caracteres"
          ></RegisterForm>
          <RegisterForm
            title="Contraseña"
            holder="Ingrese la contraseña"
            text="Máx. 100 caracteres"
          ></RegisterForm>
          <RegisterFromBold
            title="Rol"
            textCenter="Gestor de Proveedores"
            text="Selecciona el rol correspondiente"
          ></RegisterFromBold>
          <ButtomCrear link="/Dashboard"></ButtomCrear>
        </div>
      </div>
    </div>
    </div>
  );
};

export default index;
