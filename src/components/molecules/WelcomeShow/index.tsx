import React from "react";
import ButtonYe from "@/components/atoms/buttomYe";
import ButtonWh from "@/components/atoms/buttonWh";
import { MediumTitle, SmallTextDefault } from "@/components/atoms/heroTitle";
const index = () => {
  return (
    <div className="w-full">
      <div className="h-80 flex flex-col justify-center items-center gap-6">
        <div className="font-bold">
          <MediumTitle text="Bienvenido a PetSore"></MediumTitle>
        </div>
        <SmallTextDefault text="Administra tus proveedores y usuarios de manera efectiva."></SmallTextDefault>
        <div className="flex flex-row gap-5">
          <ButtonWh text="Gestionar Usuarios"></ButtonWh>
          <ButtonYe text="Ver Proveedores" href="/suppliers"></ButtonYe>
        </div>
      </div>
      <div className="h-[3] w-[1200] bg-gray-200"></div>
    </div>
  );
};

export default index;
