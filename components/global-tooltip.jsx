import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TooltipArrow } from "@radix-ui/react-tooltip";

const GlobalTooltip = ({
  children,
  content,
  className,
  sideOffset = 5,
  side = "right",
}) => {
  return (
    <TooltipProvider>
      <Tooltip side="right">
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className={className}
          sideOffset={sideOffset}
          side={side}
        >
          {content}
          <TooltipArrow className=" fill-white" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GlobalTooltip;
