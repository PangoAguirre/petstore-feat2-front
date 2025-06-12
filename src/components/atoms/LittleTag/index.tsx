import React, { ComponentProps } from "react";
import { SmallTextDefault } from "../heroTitle";

interface Indexprops extends ComponentProps<"div"> {
  title: string;
}
const index = ({ title = "Title", ...props }: Indexprops) => {
  return (
    <div
      {...props}
      className={
        "group flex flex-row items-center h-14 hover:cursor-pointer hover:bg-gray-400 transition-all ease-out" +
        props.className
      }
    >
      <div className="h-10 w-10 rounded-4xl bg-gray-300 group-hover:brightness-90 transition-all ease-out ml-2"></div>
      <div className="mt-3 h-10 w-35 ml-3">
        <SmallTextDefault text={title}></SmallTextDefault>
      </div>
    </div>
  );
};

export default index;
