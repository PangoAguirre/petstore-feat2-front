import { FieldConfigs } from "@/components/common/PartialForm";
import z from "zod";

export const generalInfoFields = {
  name: {
    label: "Nombre",
    placeholder: "Ingrese el nombre del proveedor",
  },
  nit: {
    label: "NIT",
    placeholder: "Ingrese el NIT del proveedor",
    ztype: z
      .string()
      .regex(/\b[0-9]{10}\b/, "El nit debe contener exactamente 10 dígitos."),
  },
  // TODO: ask back to add
  // category: {
  //   label: "Categoría",
  //   hint: "Ej. Alimentos, Juguetes, etc.",
  //   placeholder: "Ingrese la categoría",
  // },
  // deliveryTime: {
  //   label: "Tiempo de Entrega",
  //   placeholder: "Ingrese el tiempo de entrega (días)",
  //   ztype: z.coerce.number().positive(),
  // },
} satisfies FieldConfigs;

export const contactInfoFields = {
  phone: {
    label: "Teléfono",
    placeholder: "Ingrese el número de teléfono",
  },
  email: {
    label: "Email",
    placeholder: "Ingrese el correo electrónico",
    type: "email",
    ztype: z.string().email(),
  },
  // socials: {
  //   label: "Redes Sociales",
  //   placeholder: "Enlace a las redes sociales",
  // },
  address: {
    label: "Dirección Física",
    placeholder: "Ingrese la dirección completa",
  },
} satisfies FieldConfigs;

export const paymentConditionsFields = {
  creditDays: {
    label: "Días de crédito",
    type: "number",
    ztype: z.coerce.number().positive(),
  },
  startDate: {
    label: "Fecha de inicio",
    type: "date",
    ztype: z.coerce.date(),
  },
  endDate: {
    label: "Fecha límite",
    type: "date",
    ztype: z.coerce.date(),
  },
  grade: {
    label: "Nota",
    type: "number",
    ztype: z.coerce.number(),
  },
} satisfies FieldConfigs;

export const productFields = {
  code: { label: "Código" },
  name: { label: "Nombre" },
  description: { label: "Descripción" },
  price: {
    label: "Precio",
    type: "number",
    ztype: z.coerce.number().positive(),
  },
} satisfies FieldConfigs;
