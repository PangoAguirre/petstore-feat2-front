import { Separator } from "../ui/separator";
import { FlexCol } from "../common/FlexCol";
import { SummaryItem } from "./SummaryItem";

// TODO: define proper type for all info
export function Summary({ info }: { info: Record<string, string> }) {
  return (
    <ul className="flex flex-col">
      <SummaryItem icon="📝">
        <FlexCol>
          <span className="font-bold">Datos Generales</span>
          <span>Nombre: {info.name}</span>
          <span>NIT: {info.nit}</span>
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
          <span>{info.products.length} Productos agregados</span>
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
          <span>Fecha de inicio: {info.startDate}</span>
          <span>Fecha límite: {info.endDate}</span>
        </FlexCol>
        <FlexCol right>
          <span>Días crédito: {info.creditDays}</span>
        </FlexCol>
      </SummaryItem>
    </ul>
  );
}
