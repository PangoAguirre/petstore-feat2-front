import React from "react";
import PawDog from "@/components/icons/pawDog";
import { SmallTextDefault, BigText } from "../heroTitle";

interface indexprops {
  title: string;
  text: string;
  date: string;
}

const index = ({
  title = "Title",
  text = "Text",
  date = "Date",
}: indexprops) => {
  return (
    <div>
      <div className="flex flex-row items-center w-[520] h-25">
        <div className="flex justify-center items-center h-15 w-15 bg-amber-200 rounded-4xl">
          <PawDog></PawDog>
        </div>
        <div className=" flex flex-row ml-3">
          <div className="w-80">
            <div className="font-bold">
              <BigText text={title}></BigText>
            </div>
            <div>
              <SmallTextDefault text={text}></SmallTextDefault>
            </div>
          </div>
        <div className="flex items-center font-bold">
          <BigText text={date}></BigText>
        </div>
        </div>
      </div>
      <div className="h-[3] w-[520] bg-gray-200"></div>
    </div>
  );
};

export default index;
