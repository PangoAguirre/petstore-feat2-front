import { PropsWithChildren } from "react";

export function SummaryItem(props: PropsWithChildren & { icon: string }) {
  return (
    <li className="flex flex-row items-center">
      <div
        className="text-4xl text-center p-3 m-3 aspect-square rounded-full bg-gray-200
        "
      >
        {props.icon}
      </div>
      <div className="flex flex-row justify-between gap-4 w-full">
        {props.children}
      </div>
    </li>
  );
}
