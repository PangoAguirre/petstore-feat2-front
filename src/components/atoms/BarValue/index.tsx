import React from "react";
import { SmallTextDefault, SubTexto } from "../heroTitle";

interface Indexprops{
    title: string;
    subText: string;
    littleText: string;
}
const index = ({title = "Title", subText = "Text", littleText = "LittleText"}: Indexprops) => {
  return (
    <div className="w-[520] h-90 ring-2 ring-gray-300 rounded-[6]">
      <div className="flex flex-col gap-3">
        <div className="mt-3 ml-3 font-bold">
          <SmallTextDefault text={title}></SmallTextDefault>
        </div>
        <div className="ml-3 opacity-80">
          <SubTexto text={subText}></SubTexto>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-start items-end  h-60 w-[460] bg-white m-3 gap-5">
          <div className="bg-gray-500 h-60 w-15"></div>
          <div className="bg-gray-500 h-40 w-15"></div>
          <div className="bg-gray-500 h-25 w-15"></div>
          <div className="bg-gray-500 h-35 w-15"></div>
          <div className="bg-gray-500 h-30 w-15"></div>
          <div className="bg-gray-500 h-45 w-15"></div>
          <div className="bg-gray-500 h-37 w-15"></div>
        </div>
      </div>
      <div className="flex justify-end mr-8 opacity-80">
        <SubTexto text={littleText}></SubTexto>
      </div>
    </div>
  );
};

export default index;
