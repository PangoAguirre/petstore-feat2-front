import React, { ComponentProps } from "react";
import { SmallTextDefault } from "../heroTitle";
import Link from "next/link";

interface Indexprops extends ComponentProps<"div"> {
  href?: string;
  icon?: string;
  title: string;
}
const index = ({ title = "Title", href, icon, ...props }: Indexprops) => {
  return (
    <div
      {...props}
      className={
        "group flex flex-row items-center h-14 hover:cursor-pointer hover:bg-gray-400 transition-all ease-out" +
        props.className
      }
    >
      <div className="flex justify-center items-center aspect-square h-10 w-10 rounded-4xl bg-gray-300 group-hover:brightness-90 transition-all ease-out ml-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="mt-3 h-10 w-35 ml-3">
        {href ? (
          <Link href={href}>
            <SmallTextDefault text={title}></SmallTextDefault>
          </Link>
        ) : (
          <SmallTextDefault text={title}></SmallTextDefault>
        )}
      </div>
    </div>
  );
};

export default index;
