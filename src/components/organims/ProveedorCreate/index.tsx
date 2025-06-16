import React from "react";
import CardProve from "@/components/atoms/cardProve";
import { MediumTitleW, SmallTextDefault } from "@/components/atoms/heroTitle";
import ButtomYe from "@/components/atoms/buttomYe";
import { useGetSuppliersStatsQuery } from "@/lib/graphql/codegen";
import { format } from "date-fns";
import { Loader2Icon } from "lucide-react";
import { motion } from "motion/react";

const ProveedorCreate = () => {
  const { data, loading } = useGetSuppliersStatsQuery({
    context: {
      serviceName: "suppliers",
    },
  });
  const lastSuppliers = data?.getProveedores
    ? data.getProveedores
        .toSorted((p1, p2) => {
          const f1 = p1 && p1.fechaRegistro ? p1?.fechaRegistro : "";
          const f2 = p2 && p2.fechaRegistro ? p2?.fechaRegistro : "";
          return new Date(f1).getDate() - new Date(f2).getDate();
        })
        .filter((p) => p?.activo === true)
    : [];

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
            <ButtomYe text="Agregar Proveedor" href="/suppliers/new"></ButtomYe>
          </div>
        </div>

        {loading ? (
          <Loader2Icon className="m-auto animate-spin" />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mr-5"
          >
            {lastSuppliers.slice(0, 3).map((p, idx) => (
              <CardProve
                key={idx}
                title={p?.nombre ?? "Sin nombre"}
                date={format(new Date(p?.fechaRegistro ?? ""), "dd/MM/yyyy")}
              />
            ))}
          </motion.div>
        )}
      </div>
      <div className="h-[3] w-[1200] bg-gray-200"></div>
    </div>
  );
};

export default ProveedorCreate;
