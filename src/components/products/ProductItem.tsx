import { ComponentProps } from "react";
import { Checkbox } from "../ui/checkbox";
import { ProductInfo } from "./ProductCard";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ProductItemProps extends ComponentProps<typeof Checkbox> {
  info: ProductInfo;
}

export function ProductItem({ info, ...checkboxProps }: ProductItemProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={cn(
        "flex justify-between items-center gap-10 p-2",
        checkboxProps.disabled ? "!opacity-50" : "",
      )}
    >
      <Checkbox
        className={cn(
          "disabled:invisible data-[state=checked]:bg-destructive",
          checkboxProps.className,
        )}
        {...checkboxProps}
      />
      <div className="text-center aspect-square p-2 rounded-full bg-gray-100">
        <span className="text-2xl">📦</span>
      </div>
      <div className="grow">
        <span className="font-bold text-lg">{info.name}</span>
        <p className="font-light">{info.description}</p>
      </div>
      <span className="font-bold text-lg">${info.price}</span>
    </motion.div>
  );
}
