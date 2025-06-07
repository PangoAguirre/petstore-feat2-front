import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import React, { ComponentProps } from "react";
interface Indexprops extends ComponentProps<"button"> {
  text: string;
  loading?: boolean;
}

const index = ({ text = "Text", loading = false, ...props }: Indexprops) => {
  return (
    <Button
      className="w-[240] h-11 rounded-[6] cursor-pointer text-white transition-all ease-out"
      disabled={loading}
      {...props}
    >
      {loading ? <LoaderCircle className="animate-spin" /> : text}
    </Button>
  );
};

export default index;
