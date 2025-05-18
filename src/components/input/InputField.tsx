import { Label } from "@radix-ui/react-label";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { Input } from "../ui/input";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface InputFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  className?: ClassNameValue;
  hint?: string | React.ReactNode;
  required?: boolean;
}

export function InputField({
  id,
  label,
  placeholder,
  className,
  hint,
  ...props
}: InputFieldProps & ReturnType<UseFormRegister<FieldValues>>) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input {...props} placeholder={placeholder} />
      {hint && (
        <motion.span
          initial={{ translateY: "-100%", opacity: 0 }}
          animate={{ translateY: "0%", opacity: 1 }}
          className="font-extralight text-gray-600 text-sm"
        >
          {hint}
        </motion.span>
      )}
    </div>
  );
}
