import { FieldConfigs } from "@/components/common/PartialForm";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pwRequirements(pass: string) {
  return (
    pass.length >= 7 &&
    pass.match(/.*[A-Z].*/) &&
    pass.match(/.*[^a-zA-Z0-9].*/)
  );
}

export function createSchema(fields: FieldConfigs) {
  return z.object(
    Object.fromEntries(
      Object.entries(fields).map(([id, { type }]) => [
        id,
        type ?? z.string().nonempty({ message: "Requerido" }),
      ]),
    ),
  );
}

export function createDefaultValues(fields: FieldConfigs) {
  return Object.fromEntries(Object.keys(fields).map((f) => [f, ""]));
}
