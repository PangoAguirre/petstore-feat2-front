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
        "flex flex-row justify-center items-center w-50 h-14 " + props.className
      }
    >
      <div className="h-10 w-10 rounded-4xl bg-gray-300 ml-2"></div>
      <div className="mt-3 h-10 w-35 ml-3">
        <SmallTextDefault text={title}></SmallTextDefault>
      </div>
    </div>
  );
};

export default index;

