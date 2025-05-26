import React from "react";
import { SubTitle } from "@/components/atoms/heroTitle";
import NavTitle from "@/components/atoms/navTitle";
import Logo from "@/components/atoms/logo";
import Search from "@/components/icons/search";

interface Indexprops {
  title?: string;
}

const index = ({ title = "Title" }: Indexprops) => {
  return (
    <nav className="w-screen h-[140] bg-secondary shadow-md inset-shadow-sm">
      <div className=" flex items-center">
        <div>
          <Logo></Logo>
        </div>
        <div className="ml-10 font-bold">
          <SubTitle text={title}></SubTitle>
        </div>
        <div className="flex flex-row justify-end w-screen gap-5 mr-5">
          <NavTitle title="Proveedores" link="/"></NavTitle>
          <NavTitle title="Gestión de Usuarios" link="/"></NavTitle>
          <NavTitle title="Configuración" link="/"></NavTitle>
        </div>
        <div className="flex justify-between items-center h-9 w-70 bg-white rounded-[4] mr-10 ">
          <div className="flex items-center rounded-[6]">
            <input type="text" placeholder="Search in site" className="ml-4" />
          </div>
          <div className="h-5 w-5 mr-3">
            <button className="cursor-pointer">
              <Search></Search>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default index;
