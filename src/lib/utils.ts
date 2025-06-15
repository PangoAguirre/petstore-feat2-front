import { FieldConfigs } from "@/components/common/PartialForm";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z, { ZodTypeAny } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pwReqMessage =
  "La contraseña debe tener al menos 7 caracteres, una letra mayúscula y un carácter especial.";
export function pwRequirements(pass: string) {
  return (
    pass.length >= 7 &&
    pass.match(/.*[A-Z].*/) &&
    pass.match(/.*[^a-zA-Z0-9].*/)
  );
}

export type SchemaFromFields<T extends FieldConfigs> = {
  [K in keyof T]: T[K]["ztype"] extends ZodTypeAny
    ? T[K]["ztype"]
    : z.ZodString; // fallback to ZodString if no ztype
};

export function createSchema<T extends FieldConfigs>(fields: T) {
  return z.object(
    Object.fromEntries(
      Object.entries(fields).map(([id, { ztype: type }]) => [
        id,
        type ?? z.string().nonempty({ message: "Requerido" }),
      ]),
    ),
  );
}

export type ValuesFromConfig<T extends FieldConfigs> = Record<keyof T, string>;

export function createDefaultValues<T extends FieldConfigs>(fields: T) {
  return Object.fromEntries(
    Object.keys(fields).map((f) => [f, ""]),
  ) as ValuesFromConfig<T>;
}
