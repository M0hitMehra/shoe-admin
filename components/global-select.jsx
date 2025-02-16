import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GlobalSelect = ({ trigger, triggerClassName, selectItemData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Select onOpenChange={(open) => setIsOpen(open)} open={isOpen}>
      <SelectTrigger className={triggerClassName || "w-[180px]"}>
        <SelectValue placeholder={trigger} />
      </SelectTrigger>
      <SelectContent>
        {selectItemData?.map((item, i) => (
          <SelectItem
            key={item?.value}
            value={item?.value}
            className="hover:bg-gray-100 cursor-pointer rounded-lg"
          >
            {item?.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default GlobalSelect;