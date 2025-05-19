import React from "react";
import { MidText, SmallTextDefault, SubTextoMini } from "../heroTitle";
interface indexprops {
  title: string;
  text: string;
  tag1: string;
  tag2: string;
  rol: string;
}
const index = ({
  title = "Title",
  text = "Text",
  tag1 = "Tag1",
  tag2 = "Tag2",
  rol = "Rol",
}: indexprops) => {
  return (
    <div className="h-50 w-130 ring-2 ring-gray-200 rounded-[8]">
      <div className="flex flex-row m-5">
        <div>
          <div className="h-25 w-25 bg-gray-300 mt-5"></div>
        </div>
        <div className="flex flex-row ml-3 mt-3">
          <div>
            <div>
              <div className="font-bold">
                <MidText text={title}></MidText>
              </div>
              <SmallTextDefault text={text}></SmallTextDefault>
            </div>
            <div className="flex flex-row gap-3 mt-3">
              <div className="h-5 w-20 bg-gray-300 text-center rounded-[4]">
                <SubTextoMini text={tag1}></SubTextoMini>
              </div>
              <div className="h-5 w-20 bg-gray-300 text-center rounded-[4]">
                <SubTextoMini text={tag2}></SubTextoMini>
              </div>
            </div>
            <div className="flex flex-row mt-3">
              <div className="w-5 h-5 bg-gray-300 rounded-4xl"></div>
              <div>
                <SmallTextDefault text={rol}></SmallTextDefault>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
