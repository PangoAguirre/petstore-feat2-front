import React from "react";
import { SmallText } from "@/components/atoms/heroTitle";
const index = () => {
  return (
    <div className="flex flex-row justify-center items-center bg-secondary h-45 w-screen font-bold">
      <SmallText text="2025 PetStore. Todos los derechos reservados"></SmallText>
      <button className="cursor-pointer">
        <SmallText text="Política de Privacidad"></SmallText>
      </button>
      <button className="cursor-pointer">
        <SmallText text="Términos y Condiciones"></SmallText>
      </button>
    </div>
  );
};

export default index;

