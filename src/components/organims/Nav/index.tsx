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
          <NavTitle title="Inicio" link="/"></NavTitle>
          <NavTitle title="Usuarios" link="/"></NavTitle>
          <NavTitle title="Proveedores" link="/"></NavTitle>
          <NavTitle title="Reportes" link="/"></NavTitle>
        </div>
        <div>
          <div className="flex justify-between items-center h-9 w-40 bg-white rounded-[4]">
            <div className="flex relative items-center rounded-[6]">
              <input
                type="text"
                placeholder="Search in site"
                className="ml-4 w-28"
              />
              <div className="flex justify-end">
                <button className="cursor-pointer">
                  <Search></Search>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default index;
