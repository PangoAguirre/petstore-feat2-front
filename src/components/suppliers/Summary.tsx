import { Separator } from "../ui/separator";
import { FlexCol } from "../common/FlexCol";
import { SummaryItem } from "./SummaryItem";

// TODO: define proper type for all info and use zod
export function Summary({ info }: { info: Record<string, string> }) {
  return (
    <ul className="flex flex-col">
      <SummaryItem icon="📝">
        <FlexCol>
          <span className="font-bold">Datos Generales</span>
          <span>Nombre: {info.name}</span>
          <span>Descripción: {info.description}</span>
        </FlexCol>
        <FlexCol right>
          <span>Categoría: {info.category}</span>
          <span>Tiempo de entrega: {info.deliveryTime} dias</span>
        </FlexCol>
      </SummaryItem>
      <Separator />
      <SummaryItem icon="📦">
        <FlexCol>
          <span className="font-bold">Productos Asociados</span>
          <span>{info.name} Productos agregados</span>
        </FlexCol>
        <FlexCol right>
          <span>Ver detalles</span>
        </FlexCol>
      </SummaryItem>
      <Separator />
      <SummaryItem icon="📞">
        <FlexCol>
          <span className="font-bold">Información de Contacto</span>
          <span>Teléfono: {info.phone}</span>
          <span>Email: {info.email}</span>
        </FlexCol>
        <FlexCol right>
          <span>Dirección: {info.address}</span>
        </FlexCol>
      </SummaryItem>
      <Separator />
      <SummaryItem icon="💳">
        <FlexCol>
          <span className="font-bold">Condiciones de Pago</span>
          <span>Plazo de Pago: {info.paymentDeadline}</span>
        </FlexCol>
        <FlexCol right>
          <span>Método de Pago: {info.paymentMethod}</span>
        </FlexCol>
      </SummaryItem>
    </ul>
  );
}
