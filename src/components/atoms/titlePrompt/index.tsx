import React from "react";
import { HeroTitle, SmallText } from "../heroTitle";
const index = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-60">
        <HeroTitle text="Crear Gestor de Proveedores"></HeroTitle>
        <SmallText text="Por favor, complete los detalles a continuación para crear un nuevo gestor de proveedores."></SmallText>
      </div>
      <div className="h-1 w-screen bg-gray-100"></div>
    </div>
  );
};

export default index;
