import { Button } from "../ui/button";
import { InputField, InputFieldProps } from "../input/InputField";
import {
  useForm,
  RegisterOptions,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";

export interface FieldConfig extends InputFieldProps {
  rules?: RegisterOptions<FieldValues>;
}

interface StepCompProps {
  fields: FieldConfig[];
  onSubmit: SubmitHandler<FieldValues>;
  btnText?: string;
}

export function BasicForm(props: StepCompProps) {
  const { register, handleSubmit } = useForm();

  return (
    <form
      onSubmit={handleSubmit(props.onSubmit)}
      className="flex flex-col gap-10 grow py-8"
    >
      {props.fields.map(({ rules, ...fProps }, idx) => {
        return (
          <InputField
            {...register(fProps.id, rules)}
            {...fProps}
            required={rules?.required === true}
            key={idx}
          />
        );
      })}
      <Button type="submit" className="w-fit py-5 px-12">
        {props.btnText ?? "Siguiente"}
      </Button>
    </form>
  );
}
