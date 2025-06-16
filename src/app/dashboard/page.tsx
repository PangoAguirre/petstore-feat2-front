"use client";

import LittleTag from "@/components/atoms/LittleTag";
import LastUpdate from "@/components/molecules/LastUpdate";
import WelcomeShow from "@/components/molecules/WelcomeShow";
import ProveedorCreate from "@/components/organims/ProveedorCreate";
import Stadistics from "@/components/organims/Stadistics";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <div className="">
      <div className="flex flex-row justify-between">
        <div className=" bg-gray-200">
          <LittleTag icon="🐱" title="Proveedores" href="/suppliers" />
          <LittleTag icon="👥" title="Usuarios" />
          <LittleTag
            icon="❌"
            title="Cerrar Sesión"
            onClick={() => signOut()}
          />
        </div>
        <div className="">
          <WelcomeShow></WelcomeShow>
          <Stadistics></Stadistics>
          <ProveedorCreate></ProveedorCreate>
          <LastUpdate></LastUpdate>
        </div>
      </div>
    </div>
  );
}
