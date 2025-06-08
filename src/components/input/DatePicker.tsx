"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export function DatePicker(props: ControllerRenderProps<FieldValues, string>) {
  const [date, setDate] = React.useState<Date | undefined>(props.value);

  return (
    <Popover>
      <PopoverTrigger type="button" asChild>
        <Button
          type="button"
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
          disabled={props.disabled}
          ref={props.ref}
          name={props.name}
          onBlur={props.onBlur}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date);
            props.onChange(date);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
