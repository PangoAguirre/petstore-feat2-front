"use client";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { FieldConfigs, PartialForm, PartialFormProps } from "./PartialForm";
import { createDefaultValues, createSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, InfoProps } from "./Info";

interface SingleFormProps<T extends FieldConfigs>
  extends Omit<PartialFormProps<T>, "leftInfo"> {
  values?: FieldValues;
  info?: InfoProps;
}

export function SingleForm<T extends FieldConfigs>({
  values,
  info,
  ...props
}: SingleFormProps<T>) {
  const form = useForm({
    defaultValues: values ?? createDefaultValues(props.fields),
    resolver: zodResolver(createSchema(props.fields)),
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
