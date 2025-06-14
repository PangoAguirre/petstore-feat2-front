import { FieldConfigs } from "@/components/common/PartialForm";
import z from "zod";
import { pwRequirements } from "../utils";

export const adminCreationFields: FieldConfigs = {
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
};
