import { useDeleteSupplierMutation } from "@/lib/graphql/codegen";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogContent,
  DialogClose,
} from "../ui/dialog";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export function SupplierDeletion(props: { id: string; name: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [deleteIt, { loading }] = useDeleteSupplierMutation({
    context: { serviceName: "suppliers" },
    variables: { id: props.id },
    onCompleted: () => {
      setOpen(false);
      toast.info("Proveedor eliminado");
      router.replace("/suppliers");
    },
    onError: ({ message }) => {
      setOpen(false);
      toast.error("Imposible eliminar", { description: message });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Eliminar Proveedor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Eliminar Proveedor?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Esto eliminará al proveedor
          <strong>{`"${props.name}"`}</strong> y todos sus datos asociados.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancelar</Button>
          </DialogClose>
          <Button
            onClick={() => {
              deleteIt();
            }}
            variant={"destructive"}
            disabled={loading}
          >
            {loading ? <Loader2Icon className="animate-spin" /> : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
