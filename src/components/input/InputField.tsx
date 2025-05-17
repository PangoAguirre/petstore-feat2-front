import { Label } from "@radix-ui/react-label";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { Input } from "../ui/input";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

export function InputField({
  id,
  label,
  placeholder,
  className,
  ...props
}: {
  id: string;
  label: string;
  placeholder?: string;
  className?: ClassNameValue;
} & ReturnType<UseFormRegister<FieldValues>>) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input {...props} placeholder={placeholder} />
    </div>
  );
}
