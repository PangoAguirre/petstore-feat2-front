import BarValue from "@/components/atoms/BarValue";
import ButtomYe from "@/components/atoms/buttomYe";
import ButtomWh from "@/components/atoms/buttonWh";
import CardsCustom from "@/components/atoms/CardsCustom";
import { MediumTitle, SmallTextDefault } from "@/components/atoms/heroTitle";
import { useGetSuppliersStatsQuery } from "@/lib/graphql/codegen";

const Stadistics = () => {
  const { data, loading } = useGetSuppliersStatsQuery({
    context: {
      serviceName: "suppliers",
    },
  });

  const activeSuppliers = data?.getProveedores
    ? data.getProveedores.filter((p) => p?.activo === true).length
    : 0;

  return (
    <div>
      <div className="flex flex-row justify-between items-center w-[1000] h-120 gap-20">
        <div className="h-90 w-130 ml-10">
          <div className="font-bold mb-2">
            <MediumTitle text="Estadísticas Clave"></MediumTitle>
          </div>
          <SmallTextDefault text="Métricas sobre tus proveedores y usuarios"></SmallTextDefault>
          <div className="flex flex-row gap-5 mt-10">
            <ButtomWh text="Exportar"></ButtomWh>
            <ButtomYe text="Detalles"></ButtomYe>
          </div>
          <div
            className="flex flex-row gap-5
        mt-15"
          >
            <CardsCustom
              title="Proveedores Activos"
              number={activeSuppliers.toString()}
              text="+5 desde ayer"
            ></CardsCustom>
            <CardsCustom
              title="Usuarios Registrados"
              number="100"
              text="-2 desde ayer"
            ></CardsCustom>
          </div>
        </div>
        <div className="">
          <BarValue
            title="Crecimiento de Usuarios"
            subText="Usuario"
            littleText="Días"
          ></BarValue>
        </div>
      </div>
      <div className="h-[3] w-[1200] bg-gray-200"></div>
    </div>
  );
};

export default Stadistics;
