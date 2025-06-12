import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import React, { ComponentProps } from "react";
interface Indexprops extends ComponentProps<"button"> {
  text: string;
  loading?: boolean;
  href?: string;
}

const index = ({
  text = "Text",
  loading = false,
  href,
  ...props
}: Indexprops) => {
  return (
    <Button
      className="w-[240] h-11 rounded-[6] cursor-pointer text-white transition-all ease-out"
      disabled={loading}
      asChild={href != undefined}
      {...props}
    >
      {loading ? (
        <LoaderCircle className="animate-spin" />
      ) : href ? (
        <Link href={href}>{text}</Link>
      ) : (
        text
      )}
    </Button>
  );
};

export default index;
