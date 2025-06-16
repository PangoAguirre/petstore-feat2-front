import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { motion } from "motion/react";

export interface ProductInfo {
  code: number | string;
  name: string;
  description: string;
  price: number;
  img?: string;
}

export function ProductCard({
  info,
  selected,
  toggleSelected,
}: {
  info: ProductInfo;
  selected?: boolean;
  toggleSelected?: () => void;
}) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <Card
        className={cn(
          "p-0 relative w-[240px] rounded-md hover:cursor-pointer",
          selected ? "border-red-500 border-4" : "",
        )}
        onClick={toggleSelected}
      >
        <CardContent className="m-0 p-0">
          <div className="m-full aspect-square">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/8334/8334173.png"
              alt={"product " + info.code}
              width={128}
              height={128}
              className="w-full h-full object-fill p-2"
            />
          </div>
          <div className="flex flex-col p-3 g-1">
            <span>{info.name}</span>
            <span className="font-bold">${info.price}</span>
            <p>{info.description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
