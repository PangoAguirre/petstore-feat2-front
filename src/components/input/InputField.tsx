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

export interface InputFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  hint?: string;
  type?: HTMLInputTypeAttribute;
}

export function InputField({
  id,
  label,
  placeholder,
  hint,
  state,
  ...props
}: InputFieldProps &
  ControllerRenderProps<FieldValues, string> & {
    state: ControllerFieldState;
  }) {
  return (
    <FormItem className={cn("flex flex-col gap-1")}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormControl>
        <Input
          id={id}
          placeholder={placeholder}
          className="bg-white"
          {...props}
        />
      </FormControl>
      <AnimatePresence>
        {state.error && (
          <motion.div
            key="error"
            initial={{ translateY: "-100%", opacity: 0 }}
            animate={{ translateY: "0%", opacity: 1 }}
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
