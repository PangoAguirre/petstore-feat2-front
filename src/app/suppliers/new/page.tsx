"use client";

import { Info } from "@/components/common/Info";
import { FieldConfigs, PartialForm } from "@/components/common/PartialForm";
import { NewProduct } from "@/components/suppliers/NewProduct";
import { ProductCard } from "@/components/suppliers/ProductCard";
import { StepScreen } from "@/components/suppliers/StepScreen";
import { Summary } from "@/components/suppliers/Summary";
import { Button } from "@/components/ui/button";
import { useNewSupplierMutation } from "@/lib/graphql/codegen";
import { createDefaultValues, createSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClassNameValue } from "tailwind-merge";
import { z } from "zod";

export default function NewSupplier() {
  const [createSupplier, {}] = useNewSupplierMutation({
    context: { serviceName: "suppliers" },
    onError: ({ graphQLErrors }) => {
      if (graphQLErrors.length > 0) {
        graphQLErrors.forEach((e) =>
          toast.error("Error", { description: e.message }),
        );
      } else {
        toast.error("Error", {
          description:
            "Ha ocurrido un error al hacer la solicitud, intente más tarde o contacte con un administrador.",
        });
      }
    },
    onCompleted: () => {
      toast.success("Proveedor creado exitosamente!");
      setStep(1);
      form.reset();
    },
  });
  const { data } = useSession();

  const [step, setStep] = useState(1);
  const [showProductForm, setShowProductForm] = useState(false);
  const allFields = {
    ...generalInfoFields,
    ...contactInfo,
    ...paymentConditions,
  };

  const form = useForm({
    defaultValues: {
      ...createDefaultValues(allFields),
      products: [],
    },
    resolver: zodResolver(createSchema(allFields)),
    mode: "onChange",
  });

  const { append } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const nextStep = () => setStep((s) => s + 1);

  const handleSubmit = () => {
    const values = form.getValues();

    createSupplier({
      variables: {
        nombre: values.name,
        nit: values.nit,
        email: values.email,
        direccion: values.address,
        telefono: values.phone,
        idUsuarioCreador: data!.user.id,
        productos: values.products.map((p: Record<string, unknown>) => ({
          codigo: p.code,
          nombre: p.name,
          descripcion: p.description,
          precio: parseFloat(p.price as string),
        })),
        condicionesPago: {
          idUsuario: data!.user.id,
          nota: values.grade,
          diasCredito: parseInt(values.creditDays),
          fechaInicio: values.startDate,
          fechaFin: values.endDate,
        },
      },
    });
  };

  const innerDivCn: ClassNameValue =
    "grid grid-cols-2 justify-around items-center px-4 gap-16 w-full";

  return (
    <FormProvider {...form}>
      <div className="flex flex-col w-full h-full p-12 overflow-x-hidden">
        <StepScreen show={step == 1}>
          <Info
            title="Agregar proveedor"
            desc="Por favor, completa la información necesaria para registrar un nuevo proveedor."
          />

          <PartialForm
            leftInfo={
              <Info
                title="Paso 1 - Datos Generales"
                desc="Ingrese los datos generales del proveedor."
              />
            }
            onAction={nextStep}
            fields={generalInfoFields}
          />
        </StepScreen>

        <StepScreen show={step == 2}>
          <Info
            title="Paso 2 – Productos Asociados"
            desc="¿Qué productos ofrece este proveedor?"
          >
            <Button variant={"outline"}>Eliminar Producto</Button>
            <Button onClick={() => setShowProductForm(true)}>
              Agregar Producto
            </Button>
          </Info>
          <div className={innerDivCn}>
            <Info title="Lista de Productos">
              <Button onClick={() => nextStep()}>Siguiente</Button>
              <Button>Guardar Productos</Button>
            </Info>
            <div className="flex flex-wrap gap-4">
              {form
                .getValues("products")
                .map((p: Record<string, unknown>, idx: number) => (
                  <ProductCard
                    key={idx}
                    info={{
                      name: p.name as string,
                      brand: "General",
                      price: p.price as number,
                      inStock: true,
                    }}
                  />
                ))}
            </div>
          </div>
          <NewProduct
            open={showProductForm}
            onOpenChange={setShowProductForm}
            onSubmit={(data) => {
              append(data);
              setShowProductForm(false);
            }}
            onCancel={() => setShowProductForm(false)}
          />
        </StepScreen>

        <StepScreen show={step == 3}>
          <Info
            title="Paso 3 – Información de Contacto"
            desc="Proporcione la información de contacto del proveedor."
          />
          <PartialForm
            leftInfo={<Info title="Contacto" />}
            onAction={nextStep}
            fields={contactInfo}
          />
        </StepScreen>

        <StepScreen show={step == 4}>
          <Info
            title="Paso 4 – Condiciones de Pago"
            desc="Defina las condiciones de pago con el proveedor."
          />
          <PartialForm
            leftInfo={<Info title="Condiciones de Pago" />}
            onAction={nextStep}
            fields={paymentConditions}
          />
        </StepScreen>

        <StepScreen show={step == 5}>
          <Info
            title="Resumen de Proveedor"
            desc="Revise toda la información ingresada antes de finalizar."
          >
            <Button variant={"outline"} onClick={() => setStep(1)}>
              Volver a Revisar
            </Button>
            <Button onClick={handleSubmit}>Finalizar</Button>
          </Info>
          <div className={innerDivCn}>
            <Info title="Revisión Final" />
            <Summary info={form.getValues()} />
          </div>
        </StepScreen>
      </div>
    </FormProvider>
  );
}

const generalInfoFields: FieldConfigs = {
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
  category: {
    label: "Categoría",
    hint: "Ej. Alimentos, Juguetes, etc.",
    placeholder: "Ingrese la categoría",
  },
  deliveryTime: {
    label: "Tiempo de Entrega",
    placeholder: "Ingrese el tiempo de entrega (días)",
    ztype: z.coerce.number().positive(),
  },
};

const contactInfo: FieldConfigs = {
  phone: {
    label: "Teléfono",
    placeholder: "Ingrese el número de teléfono",
  },
  email: {
    label: "Email",
    placeholder: "Ingrese el correo electrónico",
  },
  socials: {
    label: "Redes Sociales",
    placeholder: "Enlace a las redes sociales",
  },
  address: {
    label: "Dirección Física",
    placeholder: "Ingrese la dirección completa",
  },
};

const paymentConditions: FieldConfigs = {
  creditDays: {
    label: "Días de crédito",
    type: "number",
    ztype: z.coerce.number().positive(),
  },
  // TODO: change to a date picker
  startDate: {
    label: "Fecha de inicio",
  },
  endDate: {
    label: "Fecha límite",
  },
  grade: {
    label: "Nota",
    type: "number",
    ztype: z.coerce.number(),
  },
};
