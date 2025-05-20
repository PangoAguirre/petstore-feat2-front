import React from "react";


const HeroTitle = ({ text }: { text: string }) => {
  return (
    <p className="text-[56px]">
      {text}
    </p>
  );
};

const MediumTitle = ({ text }: { text: string }) => {
  return (
    <p className="text-[40px]">
      {text}
    </p>
  );
};

const MediumTitleW = ({ text }: { text: string }) => {
  return (
    <p className="text-[40px] w-[500]">
      {text}
    </p>
  );
};

const SubTitle = ({ text }: { text: string }) => {
  return (
    <p className="text-[28px] w-max">
      {text}
    </p>
  );
};

const BigText = ({ text }: { text: string }) => {
  return (
    <p className="text-[25px]">
      {text}
    </p>
  );
};

const MidText = ({ text }: { text: string }) => {
  return (
    <p className="text-[22px]">
      {text}
    </p>
  );
};

const SmallText = ({ text }: { text: string }) => {
  return (
    <p className="text-[18px] w-[500] text-center">
      {text}
    </p>
  );
};

const SmallTextDefault = ({ text }: { text: string }) => {
  return (
    <p className="text-[18px]">
      {text}
    </p>
  );
};

const SubTexto = ({ text }: { text: string }) => {
  return (
    <p className="text-[14px]">
      {text}
    </p>
  );
};

const SubTextoMini = ({ text }: { text: string }) => {
  return (
    <p className="text-[12px]">
      {text}
    </p>
  );
};

export { HeroTitle, MediumTitle, MediumTitleW, BigText, SmallTextDefault, SubTitle, SmallText, MidText, SubTexto, SubTextoMini };
