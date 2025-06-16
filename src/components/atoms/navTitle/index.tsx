import React from "react";
import Link from "next/link";

interface Indexprops {
  title?: string;
  link: string;
}

const Index = ({ title = "Title", link = "/" }: Indexprops) => {
  return (
    <Link href={link}>
      <div className="group h-20 w-[150] flex justify-center items-center cursor-pointer">
        <h1 className="text-sm text-black font-normal text-[16px] transition-all group-hover:scale-105 group-hover:font-bold">
          {title}
        </h1>
      </div>
    </Link>
  );
};

export default Index;
