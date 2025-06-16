import React from "react";
import { SubTitle } from "@/components/atoms/heroTitle";
import NavTitle from "@/components/atoms/navTitle";
import Logo from "@/components/atoms/logo";

interface Indexprops {
  title?: string;
}

const index = ({ title = "Title" }: Indexprops) => {
  return (
    <nav className="w-screen h-[140] bg-secondary shadow-md inset-shadow-sm">
      <div className="flex items-center justify-between gap-4 lg:gap-0 overflow-hidden">
        <div className="flex items-center">
          <div>
            <Logo></Logo>
          </div>
          <div className="ml-8 font-bold">
            <SubTitle text={title}></SubTitle>
          </div>
        </div>
        <div className="hidden sm:flex flex-row justify-end w-screen gap-5 mr-5">
          <NavTitle title="Inicio" link="/"></NavTitle>
          <NavTitle title="Proveedores" link="/suppliers"></NavTitle>
          <NavTitle title="Gestión de Usuarios" link="/"></NavTitle>
        </div>
      </div>
    </nav>
  );
};

export default index;
