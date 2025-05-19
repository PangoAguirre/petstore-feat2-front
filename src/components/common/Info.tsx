export interface InfoProps {
  title: string;
  desc?: string;
}

export function Info({
  title,
  desc,
  ...props
}: React.ComponentProps<"div"> & InfoProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      {desc && <p>{desc}</p>}
      {props.children && (
        <div className="flex gap-4 justify-around">{props.children}</div>
      )}
    </div>
  );
}
