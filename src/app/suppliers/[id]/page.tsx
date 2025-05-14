export default async function SupplierDetails(props: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await props.params;
  return (
    <div className="w-full p-12 text-center">
      <h1 className="text-3xl">
        Here goes <strong>SupplierDetails</strong>
        for id: {id}
      </h1>
    </div>
  );
}
