import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { HTMLInputTypeAttribute } from "react";
import { DatePicker } from "./DatePicker";
import { SelectInput, SelectInputProps } from "./SelectInput";

export interface InputFieldProps extends SelectInputProps {
  id: string;
  label: string;
  placeholder?: string;
  hint?: string;
  type?: HTMLInputTypeAttribute | "select";
}

export function InputField({
  id,
  label,
  placeholder,
  hint,
  state,
  type,
  ...props
}: InputFieldProps &
  ControllerRenderProps<FieldValues, string> & {
    state: ControllerFieldState;
  }) {
  return (
    <FormItem className={cn("flex flex-col gap-1")}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormControl>
        {type === "date" ? (
          <DatePicker {...props} />
        ) : type == "select" ? (
          <SelectInput {...props} />
        ) : (
          <Input
            id={id}
            placeholder={placeholder}
            className="bg-white"
            type={type}
            {...props}
          />
        )}
      </FormControl>
      <AnimatePresence>
        {state.error && (
          <motion.div
            key="error"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: "0%",   opacity: 1 }}
            transition={{
              type: "spring",
              bounce: 1.4,
              damping: 12,
            }}
          >
            <FormMessage />
          </motion.div>
        )}
      </AnimatePresence>
      {hint && (
        <FormDescription>
          <span className="font-extralight text-gray-600 text-sm">{hint}</span>
        </FormDescription>
      )}
    </FormItem>
  );
}
