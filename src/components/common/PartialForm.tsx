import { Button } from "../ui/button";
import { InputField, InputFieldProps } from "../input/InputField";
import { useFormContext, FieldValues, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { FormField } from "../ui/form";
import { PropsWithChildren } from "react";
import { LoaderCircle } from "lucide-react";

export interface FieldConfigs {
  [id: string]: Omit<InputFieldProps, "id"> & { ztype?: z.ZodType };
}

export interface PartialFormProps extends PropsWithChildren {
  fields: FieldConfigs;
  btnText?: string;
  leftInfo?: React.ReactNode;
  onAction?: SubmitHandler<FieldValues>;
  loading?: boolean;
}

export function PartialForm(props: PartialFormProps) {
  const { control, trigger, getValues } = useFormContext<FieldValues>();

  return (
    <div
      className={
        props.leftInfo
          ? "flex flex-col sm:grid grid-cols-2 justify-around items-center px-4 gap-16 w-full"
          : ""
      }
    >
      {props.leftInfo}
      <form
        onSubmit={(e) => {
          e.preventDefault();

          trigger(Object.keys(props.fields)).then((valid) => {
            if (valid && props.onAction) {
              props.onAction(getValues());
            }
          });
        }}
        className="flex flex-col gap-10 grow py-8"
      >
        {Object.entries(props.fields).map(([id, fieldProps]) => (
          <FormField
            rules={{ required: true }}
            key={id}
            name={id}
            control={control}
            render={({ field, fieldState }) => (
              <InputField
                id={id}
                {...field}
                {...fieldProps}
                state={fieldState}
              />
            )}
          />
        ))}
        {props.children ?? (
          <Button
            type="submit"
            className="w-fit min-w-20 py-5 px-12"
            disabled={props.loading}
          >
            {props.loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              (props.btnText ?? "Siguiente")
            )}
          </Button>
        )}
      </form>
    </div>
  );
}
