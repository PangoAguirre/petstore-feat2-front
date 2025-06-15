import ButtomYe from "@/components/atoms/buttomYe";
import {
  BigText,
  MediumTitle,
  SmallTextDefault,
} from "@/components/atoms/heroTitle";
import HomeIcon from "@/components/icons/homeIcon";
import React from "react";

interface Indexprops {
  id: number | string;
  supplier?: string;
  active?: boolean;
  days?: string;
  buttomText?: string;
}

const index = ({
  id,
  supplier = "Supplier",
  active = true,
  days = "Days",
  buttomText = "Editar",
}: Indexprops) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center rounded-full h-25 w-25 bg-gray-200">
        <HomeIcon width={75} height={75} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <BigText text={supplier} />
        <SmallTextDefault text={active ? "Activo" : "Inactivo"} />
        <MediumTitle text={days} />
        <ButtomYe text={buttomText} href={`/suppliers/${id}`} />
      </div>
    </div>
  );
};

export default index;
