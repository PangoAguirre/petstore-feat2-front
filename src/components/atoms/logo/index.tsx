import Image from "next/image";
import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <div className="h-30 w-30">
      <Link href={"/"}>
        <Image
          src="/logo.jpg"
          width={120}
          height={120}
          alt="logos"
          className="rounded-[100] m-2"
        />
      </Link>
    </div>
  );
};

export default index;
