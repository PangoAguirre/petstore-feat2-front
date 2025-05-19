import { Card, CardContent } from "../ui/card";

export interface ProductInfo {
  name: string;
  brand: string;
  img?: string;
  price: number;
  inStock?: boolean;
}

export function ProductCard({ info }: { info: ProductInfo }) {
  return (
    <Card className="p-0 relative w-[240px] rounded-md ">
      <CardContent className="m-0 p-0">
        <div className="m-full aspect-square">
          <span className="absolute top-[-1px] left-0 px-2 py-1 text-nowrap overflow-x-hidden bg-gray-200 rounded-tl-md rounded-br-md box-content">
            Marca: {info.brand}
          </span>
          {/*TODO: IMAGE*/}
        </div>
        <div className="flex flex-col p-3 g-1">
          <span>{info.name}</span>
          <span className="font-bold">
            ${info.price} - {info.inStock ? "En stock" : "Agotado"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
