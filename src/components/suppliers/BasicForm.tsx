import { Button } from "../ui/button";
import { InputField, InputFieldProps } from "../input/InputField";
import {
  useForm,
  RegisterOptions,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export interface FieldConfig extends InputFieldProps {
  rules?: RegisterOptions<FieldValues>;
  type?: z.ZodType;
}

interface StepCompProps {
  fields: FieldConfig[];
  onSubmit: SubmitHandler<FieldValues>;
  btnText?: string;
}

export function BasicForm(props: StepCompProps) {
  const schema = z
    .object(
      props.fields.reduce((acc: Record<string, z.ZodType>, f) => {
        acc[f.id] = f.type ?? z.string();
        return acc;
      }, {}),
    )
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(props.onSubmit)}
      className="flex flex-col gap-10 grow py-8"
    >
      {props.fields.map(({ rules, ...field }, idx) => {
        return (
          <InputField
            {...register(field.id, rules)}
            {...field}
            key={idx}
            hint={
              errors[field.id]?.message ? (
                <span className="text-red-500">
                  {errors[field.id]?.message?.toString()}
                </span>
              ) : (
                field.hint
              )
            }
          />
        );
      })}
      <Button type="submit" className="w-fit py-5 px-12">
        {props.btnText ?? "Siguiente"}
      </Button>
    </form>
  );
}
