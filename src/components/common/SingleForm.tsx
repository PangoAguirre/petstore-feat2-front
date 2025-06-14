import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { PartialForm, PartialFormProps } from "./PartialForm";
import { createDefaultValues, createSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, InfoProps } from "./Info";

interface SingleFormProps extends Omit<PartialFormProps, "leftInfo"> {
  values?: FieldValues;
  info?: InfoProps;
}

export function SingleForm({ values, info, ...props }: SingleFormProps) {
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
