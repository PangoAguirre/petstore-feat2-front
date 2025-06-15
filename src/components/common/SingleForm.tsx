"use client";
import { FieldValues, FormProvider, Mode, useForm } from "react-hook-form";
import { FieldConfigs, PartialForm, PartialFormProps } from "./PartialForm";
import { createDefaultValues, createSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, InfoProps } from "./Info";
import { ZodType } from "zod";

interface SingleFormProps<T extends FieldConfigs>
  extends Omit<PartialFormProps<T>, "leftInfo"> {
  values?: FieldValues;
  info?: InfoProps;
  schema?: ZodType;
  mode?: Mode;
}

export function SingleForm<T extends FieldConfigs>({
  values,
  info,
  schema,
  mode,
  ...props
}: SingleFormProps<T>) {
  const form = useForm({
    defaultValues: values ?? createDefaultValues(props.fields),
    resolver: zodResolver(schema ?? createSchema(props.fields)),
    mode,
  });

  return (
    <FormProvider {...form}>
      <PartialForm
        leftInfo={info ? <Info {...info} /> : undefined}
        {...props}
      />
    </FormProvider>
  );
}
