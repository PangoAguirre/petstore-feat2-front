"use client";

import { Info } from "@/components/common/Info";
import { BasicForm, FieldConfig } from "@/components/suppliers/BasicForm";
import { StepScreen } from "@/components/suppliers/StepScreen";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ClassNameValue } from "tailwind-merge";

export default function NewSupplier() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((s) => s + 1);

  const generalInfoFields: FieldConfig[] = [
    {
      id: "name",
      label: "Nombre",
      placeholder: "Ingrese el nombre del proveedor",
    },
    {
      id: "descrition",
      label: "Descripción",
      placeholder: "Ingrese una breve descripción",
    },
    {
      id: "category",
      label: "Categoría",
      placeholder: "Ingrese la categoría",
    },
    {
      id: "deliveryTime",
      label: "Tiempo de Entrega",
      placeholder: "Ingrese el tiempo de entrega (días)",
    },
  ];

  const contactInfo: FieldConfig[] = [
    {
      id: "phone",
      label: "Teléfono",
      placeholder: "Ingrese el número de teléfono",
    },
    {
      id: "email",
      label: "Email",
      placeholder: "Ingrese el correo electrónico",
    },
    {
      id: "socials",
      label: "Redes Sociales",
      placeholder: "Enlace a las redes sociales",
    },
    {
      id: "address",
      label: "Dirección Física",
      placeholder: "Ingrese la dirección completa",
    },
  ];

  const paymentConditions: FieldConfig[] = [
    {
      id: "paymentDeadline",
      label: "Plazo de Pago",
      placeholder: "Ingrese el plazo (días)",
    },
    {
      id: "paymentMethod",
      label: "Método de Pago",
      placeholder: "Seleccione el método de pago",
    },
    {
      id: "paymentPenalty",
      label: "Penalización",
      placeholder: "Ingrese la penalización por retraso (si aplica)",
    },
    {
      id: "returnPolicies",
      label: "Políticas de Devolución",
      placeholder: "Ingrese las políticas de devolución",
    },
  ];

  const innerDivCn: ClassNameValue =
    "grid grid-cols-2 justify-around items-center px-16 gap-16 w-full";

  return (
    <div className="flex flex-col w-full p-12">
      <StepScreen show={step == 1}>
        <Info
          title="Bienvenido a PetSore"
          desc="Por favor, completa la información necesaria para registrar un nuevo proveedor."
        >
          <Button>Ayuda</Button>
          <Button>Inicio</Button>
        </Info>

        <div className={innerDivCn}>
          <Info
            title="Paso 1 - Datos Generales"
            desc="Ingrese los datos generales del proveedor."
          />
          <BasicForm onSubmit={() => nextStep()} fields={generalInfoFields} />
        </div>
      </StepScreen>

      <StepScreen show={step == 2}>
        <Info
          title="Paso 2 – Productos Asociados"
          desc="¿Qué productos ofrece este proveedor?"
        >
          <Button>Eliminar Producto</Button>
          <Button>Agregar Producto</Button>
        </Info>
        <div className={innerDivCn}>
          <div>
            <h2>Lista de Productos</h2>
            <div>
              <Button onClick={() => nextStep()}>Siguiente</Button>
              <Button>Guardar Productos</Button>
            </div>
          </div>
          <div>{/*TODO: draw list*/}</div>
        </div>
      </StepScreen>

      <StepScreen show={step == 3}>
        <Info
          title="Paso 3 – Información de Contacto"
          desc="Proporcione la información de contacto del proveedor."
        >
          <Button onClick={nextStep}>Siguiente</Button>
        </Info>
        <div className={innerDivCn}>
          <Info title="Contacto" />
          <BasicForm onSubmit={() => nextStep()} fields={contactInfo} />
        </div>
      </StepScreen>

      <StepScreen show={step == 4}>
        <Info
          title="Paso 4 – Condiciones de Pago"
          desc="Defina las condiciones de pago con el proveedor."
        >
          <Button onClick={nextStep}>Siguiente</Button>
        </Info>
        <div className={innerDivCn}>
          <Info title="Contacto" />
          <BasicForm
            onSubmit={() => alert("no more steps")}
            fields={paymentConditions}
          />
        </div>
      </StepScreen>
    </div>
  );
}
