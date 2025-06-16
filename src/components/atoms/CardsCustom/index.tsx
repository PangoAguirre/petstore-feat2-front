import React from "react";
import { SmallTextDefault, SubTitle } from "../heroTitle";
interface Indexprops {
  title: string;
  number: string;
  text?: string;
}

const index = ({ title = "Title", number = "Number", text }: Indexprops) => {
  return (
    <div className="flex w-[250] h-30 ring-2 ring-gray-200 rounded-[6]">
      <div className="ml-2 mt-2">
        <div className="opacity-75">
          <SmallTextDefault text={title}></SmallTextDefault>
        </div>
        <div className="font-bold">
          <SubTitle text={number}></SubTitle>
        </div>
        {text && (
          <div>
            <SmallTextDefault text={text}></SmallTextDefault>
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
