import React from "react";
import { SmallText } from "../heroTitle";
import Link from "next/link";

interface Indexpro {
  link: string;
}
const index = ({ link = "/" }: Indexpro) => {
  return (
    <Link href={link}>
      <div className="flex justify-center items-center h-11 w-60 bg-primary rounded-[6]">
        <button className="cursor-pointer text-white">
          <SmallText text="Crear Usuario"></SmallText>
        </button>
      </div>
    </Link>
  );
};

export default index;

