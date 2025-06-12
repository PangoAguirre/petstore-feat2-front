"use client";
import LittleTag from "@/components/atoms/LittleTag";
import { MediumTitle, SmallTextDefault } from "@/components/atoms/heroTitle";
import ButtomYe from "@/components/atoms/buttomYe";
import SupplierCard from "@/components/molecules/SupplierCard";
import { useGetSuppliersQuery } from "@/lib/graphql/codegen";
import { Loader2Icon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Suppliers() {
  const { data, loading, error } = useGetSuppliersQuery({
    context: { serviceName: "suppliers" },
  });

  const router = useRouter();

  return (
    <div className="flex w-full">
      <div className="flex flex-row w-1/6 min-w-fit">
        <div className="w-full bg-gray-200">
          <LittleTag
            onClick={() => router.push("/")}
            title="Inicio"
          ></LittleTag>
          <LittleTag
            onClick={() => router.push("/suppliers")}
            title="Proveedores"
          ></LittleTag>
          <LittleTag title="Productos"></LittleTag>
          <LittleTag title="Ajustes"></LittleTag>
          <LittleTag
            onClick={() => signOut()}
            title="Cerrar Sesión"
          ></LittleTag>
        </div>
      </div>
      <div className="flex flex-col justify-center w-5/6 px-8 pb-8">
        <div className="w-full flex flex-col items-center justify-center gap-5 h-80">
          <MediumTitle text="Proveedores Disponibles" />
          <SmallTextDefault text="Encuentra y gestiona a todos tus proveedores de manera eficiente." />
          <ButtomYe text="Agregar nuevo proveedor" href="/suppliers/new" />
        </div>
        <div className="h-0.25 bg-gray-200"></div>
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="font-bold">
            <MediumTitle text="Proveedores" />
          </div>
          <div className="flex flex-row w-full flex-wrap justify-center gap-4">
            {loading && <Loader2Icon className="animate-spin" />}
            {error && (
              <span>
                Ha ocurrido un error, inténtelo más tarde o contacte con un
                administrador.
              </span>
            )}
            {!loading &&
              !error &&
              data?.getProveedores?.map((p, idx) => {
                if (!p) return null;

                const days =
                  p.condicionesPago && p.condicionesPago.length > 0
                    ? p?.condicionesPago[0]?.diasCredito
                    : 0;

                return (
                  <SupplierCard
                    key={idx}
                    id={p.idProveedor}
                    supplier={p.nombre ?? "Noc"}
                    days={`${days} días`}
                    active={p.activo ?? false}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
