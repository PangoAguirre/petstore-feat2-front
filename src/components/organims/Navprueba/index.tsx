import React from "react";
import { SubTitle } from "@/components/atoms/heroTitle";
import NavTitle from "@/components/atoms/navTitle";
import Logo from "@/components/atoms/logo";
import Search from "@/components/icons/search";

interface Indexprops {
  title?: string;
  subtitle?: string;
  subtitle2?: string;
  subtitle3?: string;
}

const index = ({ title = "Title", subtitle = "Subtitle-1", subtitle2 = "Subtitle-2", subtitle3 = "Subtitle-3" }: Indexprops) => {
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
          <NavTitle title={subtitle} link="/"></NavTitle>
          <NavTitle title={subtitle2} link="/"></NavTitle>
          <NavTitle title={subtitle3} link="/"></NavTitle>
        </div>
      </div>
    </nav>
  );
};

export default index;