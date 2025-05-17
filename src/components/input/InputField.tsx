import { Label } from "@radix-ui/react-label";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { Input } from "../ui/input";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

export interface InputFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  className?: ClassNameValue;
  hint?: string;
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
        <span className="font-extralight text-gray-600 text-sm">{hint}</span>
      )}
    </div>
  );
}
