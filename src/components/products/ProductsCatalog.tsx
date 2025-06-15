import { AnimatePresence, motion } from "motion/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { NewProduct } from "./NewProduct";
import { ProductItem } from "./ProductItem";
import { useForm, useFieldArray } from "react-hook-form";
import {
  useAddProductMutation,
  useGetProductsBySupplierIdQuery,
} from "@/lib/graphql/codegen";
import { Info } from "../common/Info";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { ApolloError } from "@apollo/client";

interface ProductsCatalogProps {
  supplierId: number | string;
}

export function ProductsCatalog({ supplierId }: ProductsCatalogProps) {
  const {
    data,
    refetch,
    loading: fetchLoading,
  } = useGetProductsBySupplierIdQuery({
    context: { serviceName: "suppliers" },
    variables: { idProveedor: supplierId.toString() },
  });
  const [saveProduct, { loading: saving }] = useAddProductMutation({
    context: { serviceName: "suppliers" },
    onCompleted: () => refetch(),
  });
  const [addingProduct, setAddingProduct] = useState(false);
  const productsForm = useForm({
    defaultValues: {
      products:
        data?.listarProductosPorProveedor?.map((p) => ({
          ...p,
          selected: false,
        })) ?? [],
    },
  });
  const { append, update, remove, fields } = useFieldArray({
    control: productsForm.control,
    name: "products",
  });

  useEffect(() => {
    if (data?.listarProductosPorProveedor) {
      productsForm.setValue(
        "products",
        data?.listarProductosPorProveedor?.map((p) => ({
          ...p,
          selected: false,
        })),
      );
    }
  }, [data?.listarProductosPorProveedor, productsForm]);

  const newProducts = useMemo(() => {
    const oldProducts = new Set(
      data?.listarProductosPorProveedor?.map((p) => p?.codigo),
    );
    return fields.filter((p) => !oldProducts.has(p.codigo));
  }, [data?.listarProductosPorProveedor, fields]);

  return (
    <div className="grid grid-cols-2 justify-around items-center px-4 gap-16 w-full">
      <Info
        title="Productos Asociados"
        desc="Lista de productos asociados al proveedor."
      />
      <div className="relative flex flex-col items-stretch gap-1 min-h-8">
        <AnimatePresence>
          {fields.map((p, idx) => (
            <Fragment key={p.codigo ?? p.id}>
              <ProductItem
                checked={p.selected}
                disabled={
                  saving ||
                  !newProducts.some((newP) => p.codigo === newP.codigo)
                }
                onCheckedChange={(checked) =>
                  update(idx, {
                    ...fields[idx],
                    selected: checked === true,
                  })
                }
                info={{
                  code: p?.codigo ?? "N/A",
                  name: p?.nombre ?? "N/A",
                  description: p?.descripcion ?? "",
                  price: p?.precio ?? NaN,
                }}
              />
              <Separator />
            </Fragment>
          ))}
          {fields.length == 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              {fetchLoading ? (
                <Loader2Icon className="animate-spin m-auto" />
              ) : (
                "No hay productos asociados"
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex justify-center gap-4 py-4">
          <Button
            variant={"outline"}
            className="w-fit min-w-20 py-5 px-12"
            onClick={() => setAddingProduct(true)}
          >
            Agregar
          </Button>
          <Button
            className="w-fit min-w-20 py-5 px-12"
            disabled={saving || newProducts.length == 0}
            onClick={() => {
              newProducts.forEach((p) => {
                saveProduct({
                  variables: {
                    idProveedor: supplierId.toString(),
                    codigo: p.codigo as string,
                    nombre: p.nombre as string,
                    precio: p.precio!,
                    descripcion: p.descripcion,
                  },
                })
                  .then(() => toast.success("Guardado exitoso!"))
                  .catch((err: ApolloError) =>
                    toast.error("Error al guardar los datos", {
                      description: err.message,
                    }),
                  );
              });
            }}
          >
            {saving ? <Loader2Icon className="animate-spin" /> : "Guardar"}
          </Button>
          <Button
            variant={"destructive"}
            className="w-fit min-w-20 py-5 px-12"
            disabled={saving || newProducts.length == 0}
            onClick={() =>
              remove(
                fields
                  .map((p, idx) => (p.selected ? idx : -1))
                  .filter((i) => i >= 0),
              )
            }
          >
            Eliminar
          </Button>
        </div>
      </div>
      <NewProduct
        open={addingProduct}
        onOpenChange={setAddingProduct}
        onSubmit={(data) => {
          if (fields.some((p) => p.codigo === data.code)) {
            toast.error("Producto ya existente.", {
              description: `El producto con código ${data.code} ya existe, ingrese otro código.`,
            });
            return;
          }
          append({
            selected: false,
            codigo: data.code,
            nombre: data.name,
            descripcion: data.description,
            precio: parseFloat(data.price),
          });
          setAddingProduct(false);
        }}
      />
    </div>
  );
}
