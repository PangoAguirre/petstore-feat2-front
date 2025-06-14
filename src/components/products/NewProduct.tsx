import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogHeader } from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDefaultValues, createSchema } from "@/lib/utils";
import { productFields } from "@/lib/forms/suppliers";
import { SingleForm } from "../common/SingleForm";

interface NewProductProps {
  onSubmit: SubmitHandler<FieldValues>;
  onCancel?: () => void;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function NewProduct({
  onSubmit,
  onCancel,
  open,
  onOpenChange,
}: NewProductProps) {
  const form = useForm({
    defaultValues: createDefaultValues(productFields),
    resolver: zodResolver(createSchema(productFields)),
    mode: "onChange",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col sm:flex-row items-center px-16 gap-8 sm:max-w-4xl bg-secondary border-black">
        <DialogHeader className="flex flex-col items-center gap-4">
          <DialogTitle className="text-4xl font-bold">
            Agregar Producto o Servicio
          </DialogTitle>
          <DialogDescription className="flex gap-4 justify-around text-black">
            Completa los campos para asociar el Producto o servicio al proveedor
          </DialogDescription>
        </DialogHeader>
        <SingleForm
          onAction={(data) => {
            form.reset();
            onSubmit(data);
          }}
          fields={productFields}
        >
          <div className="flex gap-4">
            <Button
              variant={"outline"}
              type="button"
              onClick={() => {
                if (onOpenChange) onOpenChange(false);
                if (onCancel) onCancel();
              }}
              className="w-fit py-5 px-12"
            >
              Cancelar
            </Button>
            <Button type="submit" className="w-fit py-5 px-12">
              Agregar
            </Button>
          </div>
        </SingleForm>
      </DialogContent>
    </Dialog>
  );
}
