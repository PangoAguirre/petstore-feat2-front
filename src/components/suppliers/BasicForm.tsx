import { Button } from "../ui/button";
import { InputField } from "../input/InputField";
import {
  useForm,
  RegisterOptions,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";

export interface FieldConfig {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  rules?: RegisterOptions<FieldValues>;
}

interface StepCompProps {
  fields: FieldConfig[];
  onSubmit: SubmitHandler<FieldValues>;
}

export function BasicForm(props: StepCompProps) {
  const { register, handleSubmit } = useForm();

  return (
    <form
      onSubmit={handleSubmit(props.onSubmit)}
      className="flex flex-col gap-10 grow py-8"
    >
      {props.fields.map((field, idx) => {
        return (
          <InputField
            {...register(field.name, field.rules)}
            key={idx}
            id={field.name}
            label={field.label}
            placeholder={field.placeholder}
          />
        );
      })}
      <Button type="submit" className="w-fit py-5 px-12">
        Siguiente
      </Button>
    </form>
  );
}
