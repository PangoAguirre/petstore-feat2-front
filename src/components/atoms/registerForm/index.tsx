import React from "react";
import { SmallTextDefault, SubTextoMini } from "../heroTitle";
import { Input } from "@/components/ui/input";

interface Indexprops {
  title?: string;
  holder?: string;
  text?: string;
  value?: string;
  setValue?: (value: string) => void;
}

const index = ({
  title = "Title",
  holder = "Holder",
  text = "Text",
  value,
  setValue,
}: Indexprops) => {
  return (
    <div>
      <div className="font-bold">
        <SmallTextDefault text={title}></SmallTextDefault>
      </div>
      <Input
        type="email"
        required
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
        placeholder={holder}
        className="w-140 h-9 ring-2 ring-gray-200 rounded-[6]"
      />
      <div className="opacity-75">
        <SubTextoMini text={text}></SubTextoMini>
      </div>
    </div>
  );
};

export default index;
