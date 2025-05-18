import { Button } from "../ui/button";
import { InputField, InputFieldProps } from "../input/InputField";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../ui/form";
import { PropsWithChildren } from "react";

export interface FieldConfig extends InputFieldProps {
  type?: z.ZodType;
}

export interface StepCompProps extends PropsWithChildren {
  fields: FieldConfig[];
  onSubmit: SubmitHandler<FieldValues>;
  btnText?: string;
}

export function BasicForm(props: StepCompProps) {
  const schema = z
    .object(
      props.fields.reduce((acc: Record<string, z.ZodType>, f) => {
        acc[f.id] = f.type ?? z.string(); //.nonempty({ message: "Required" }); //FIXME: uncommment
        return acc;
      }, {}),
    )
    .required();

  const form = useForm({
    defaultValues: Object.fromEntries(props.fields.map((f) => [f.id, ""])),
    resolver: zodResolver(schema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(props.onSubmit)}
        className="flex flex-col gap-10 grow py-8"
      >
        {props.fields.map((fieldProps, idx) => {
          return (
            <FormField
              rules={{ required: true }}
              key={idx}
              name={fieldProps.id}
              control={form.control}
              render={({ field, fieldState }) => (
                <InputField {...field} {...fieldProps} state={fieldState} />
              )}
            />
          );
        })}
        {props.children ?? (
          <Button type="submit" className="w-fit py-5 px-12">
            {props.btnText ?? "Siguiente"}
          </Button>
        )}
      </form>
    </Form>
  );
}
