import React from "react";
interface Indexprops {
  text: string;
}

const index = ({ text = "Text" }: Indexprops) => {
  return (
    <div className="flex justify-center items-center w-[240] h-11 bg-primary rounded-[6]">
      <button className="cursor-pointer text-white">{text}</button>
    </div>
  );
};

export default index;

