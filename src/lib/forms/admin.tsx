import { FieldConfigs } from "@/components/common/PartialForm";
import z from "zod";
import { pwRequirements } from "../utils";

export const adminCreationFields = {
  username: {
    label: "Nombre de Usuario",
    placeholder: "Introduce tu nombre de usuario",
  },

  email: {
    label: "Correo Electrónico",
    placeholder: "Introduce tu correo electrónico",
    ztype: z.string().email(),
  },

  password: {
    label: "Contraseña",
    placeholder: "Introduce tu contraseña",
    hint: "Máximo 100 caracteres",
    type: "password",
    ztype: z.string().refine(pwRequirements, {
      message:
        "La contraseña debe tener al menos 7 caracteres, una letra mayúscula y un carácter especial.",
    }),
  },
} satisfies FieldConfigs;

export const supplierManagerFields = {
  username: adminCreationFields.username,
  password: adminCreationFields.password,
  role: {
    label: "Rol",
    type: "select", //TODO: maybe list of roles?
    hint: "Selecciona el rol correspondiente",
    selectOpts: ["Gestor de Proveedores"],
    defaultOpt: "Gestor de Proveedores",
  },
} satisfies FieldConfigs;
