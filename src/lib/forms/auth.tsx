import { FieldConfigs } from "@/components/common/PartialForm";
import z from "zod";
import { pwRequirements, pwReqMessage } from "../utils";

export const loginFields = {
  email: {
    label: "Correo Electrónico",
    placeholder: "tucorreo@ejemplo.com",
    type: "email",
    ztype: z.string().email({ message: "Ingrese un correo válido" }),
  },
  password: {
    label: "Contraseña",
    type: "password",
    ztype: z.string().min(4, { message: "Ingrese al menos 4 carácteres." }),
  },
} satisfies FieldConfigs;

export const signupFields = {
  fullName: {
    label: "Nombre completo",
    placeholder: "Ingrese su nombre completo",
  },
  email: {
    label: "Correo electrónico",
    placeholder: "ejemplo@correo.com",
    ztype: z.string().email({ message: "Ingrese un email válido" }),
  },
  password: {
    label: "Contraseña",
    placeholder: "Ingrese su contraseña",
    type: "password",
    ztype: z.string().refine(pwRequirements, {
      message: pwReqMessage,
    }),
  },
  passwordAgain: {
    label: "Confirmar contraseña",
    placeholder: "Repita su contraseña",
    type: "password",
    ztype: z.string().nonempty({ message: "Requerido" }),
  },
} satisfies FieldConfigs;

export const newPasswordFields = {
  password: {
    ...signupFields.password,
    label: "Nueva Contraseña",
    placeholder: "Ingresa tu nueva contraseña",
  },
  passwordAgain: {
    ...signupFields.passwordAgain,
    placeholder: "Confirma tu nueva contraseña",
  },
} satisfies FieldConfigs;
