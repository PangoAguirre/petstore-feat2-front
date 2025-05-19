import { Button } from "../ui/button";
import { InputField, InputFieldProps } from "../input/InputField";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../ui/form";
import { PropsWithChildren } from "react";

export interface FieldConfigs {
  [id: string]: Omit<InputFieldProps, "id"> & { type?: z.ZodType };
}

export interface StepCompProps extends PropsWithChildren {
  fields: FieldConfigs;
  onSubmit: SubmitHandler<FieldValues>;
  btnText?: string;
}

export function BasicForm(props: StepCompProps) {
  const schema = z.object(
    Object.fromEntries(
      Object.entries(props.fields).map(([fieldId, { type }]) => [
        fieldId,
        type ?? z.string().nonempty({ message: "Requerido" }),
      ]),
    ),
  );

  const form = useForm({
    defaultValues: Object.fromEntries(
      Object.entries(props.fields).map(([id]) => [id, ""]),
    ),
    resolver: zodResolver(schema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(props.onSubmit)}
        className="flex flex-col gap-10 grow py-8"
      >
        {Object.entries(props.fields).map(([id, fieldProps]) => {
          return (
            <FormField
              rules={{ required: true }}
              key={id}
              name={id}
              control={form.control}
              render={({ field, fieldState }) => (
                <InputField
                  id={id}
                  {...field}
                  {...fieldProps}
                  state={fieldState}
                />
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
