import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const GlobalDropdown = ({ id, title, values, register, setValue }) => {
  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className="w-full p-2 border">
            {title}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {values?.map((item) => (
            <DropdownMenuItem
              key={item._id}
              onSelect={() => setValue(id, item._id)}
            >
              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <input type="hidden" {...register} />
    </div>
  );
};