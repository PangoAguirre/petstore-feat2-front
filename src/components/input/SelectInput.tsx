import { ControllerRenderProps, FieldValues } from "react-hook-form";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "../ui/select";
import { useEffect } from "react";

export interface SelectInputProps {
  selectOpts?: string[];
  defaultOpt?: string;
}

export function SelectInput({
  selectOpts = [],
  defaultOpt,
  ...props
}: SelectInputProps & ControllerRenderProps<FieldValues, string>) {
  useEffect(() => {
    if (!props.value && defaultOpt) {
      props.onChange(defaultOpt);
    }
  }, [defaultOpt, props]);

  return (
    <Select
      defaultValue={defaultOpt}
      onValueChange={(o) => props.onChange(o)}
      value={props.value}
    >
      <SelectTrigger className="w-auto" {...props}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {selectOpts.map((opt, idx) => (
          <SelectItem key={idx} value={opt} className="hover:cursor-pointer">
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
