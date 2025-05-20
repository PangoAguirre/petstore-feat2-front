import React from "react";
import CardProve from "@/components/atoms/cardProve";
import { MediumTitleW, SmallTextDefault } from "@/components/atoms/heroTitle";
import ButtomYe from "@/components/atoms/buttomYe";
const index = () => {
  return (
    <div>
      <div className="flex flex-row w-[1200] justify-end gap-30 h-80 mt-10">
        <div className="flex flex-col gap-5 ml-10">
          <div>
            <div className="font-bold">
              <MediumTitleW text="Últimos Proveedores Añadidos"></MediumTitleW>
            </div>
            <SmallTextDefault text="Gestiona nuevos provedores rápidamente"></SmallTextDefault>
          </div>
          <div>
            <ButtomYe text="Agregar Proveedor"></ButtomYe>
          </div>
        </div>
        <div className="mr-5">
          <CardProve
            title="Proveedor A"
            text="Servicios de Cuidado"
            date="21/10/2023"
          ></CardProve>
          <CardProve
            title="Proveedor B"
            text="Alimentos"
            date="20/10/2023"
          ></CardProve>
        </div>
      </div>
      <div className="h-[3] w-[1200] bg-gray-200"></div>
    </div>
  );
};

export default index;
