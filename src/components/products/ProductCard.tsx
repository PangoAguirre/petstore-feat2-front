import { Card, CardContent } from "../ui/card";

export interface ProductInfo {
  code: number | string;
  name: string;
  description: string;
  price: number;
  img?: string;
}

export function ProductCard({ info }: { info: ProductInfo }) {
  return (
    <Card className="p-0 relative w-[240px] rounded-md ">
      <CardContent className="m-0 p-0">
        <div className="m-full aspect-square">{/*TODO: IMAGE*/}</div>
        <div className="flex flex-col p-3 g-1">
          <span>{info.name}</span>
          <span className="font-bold">${info.price}</span>
          <p>{info.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
