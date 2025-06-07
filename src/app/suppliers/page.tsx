import LittleTag from "@/components/atoms/LittleTag";
import { MediumTitle, SmallTextDefault } from "@/components/atoms/heroTitle";
import ButtomYe from "@/components/atoms/buttomYe";
import SupplierCard from "@/components/molecules/SupplierCard";

export default function Suppliers() {
  return (
    <div className="flex w-full">
      <div className="flex flex-row w-1/6">
        <div className="w-full bg-gray-200">
          <LittleTag title="Inicio"></LittleTag>
          <LittleTag title="Proveedores"></LittleTag>
          <LittleTag title="Productos"></LittleTag>
          <LittleTag title="Ajustes"></LittleTag>
          <LittleTag title="Cerrar Sesión"></LittleTag>
        </div>
      </div>
      <div className="flex flex-col justify-center w-5/6">
        <div className="w-full flex flex-col items-center justify-center gap-5 h-80">
          <MediumTitle text="Proveedores Disponibles" />
          <SmallTextDefault text="Encuentra y gestiona a todos tus proveedores de manera eficiente." />
          <ButtomYe text="Agregar nuevo proveedor" />
        </div>
        <div className="h-0.25 bg-gray-200"></div>
        <div className="flex flex-col items-center justify-center gap-10 h-120">
          <div className="font-bold">
            <MediumTitle text="Proveedores" />
          </div>
          <div className="flex flex-row gap-4">
            <SupplierCard
              supplier="Proveedor A"
              days="2 días"
              category="Categoría 1"
              buttomText="editar"
            />
            <SupplierCard
              supplier="Proveedor B"
              days="3 días"
              category="Categoría 2"
              buttomText="editar"
            />
            <SupplierCard
              supplier="Proveedor C"
              days="1 días"
              category="Categoría 3"
              buttomText="editar"
            />
            <SupplierCard
              supplier="Proveedor D"
              days="5 días"
              category="Categoría 1"
              buttomText="editar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
