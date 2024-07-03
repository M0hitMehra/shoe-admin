"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Sidebar = ({ setIsSidebarShrinked }) => {
  const [sidebarClicked, setSidebarClicked] = useState(false);
  return (
    <div className=" fixed border-8 w-full border-red-400 h-screen">
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div
        className={cn("hidden md:block", { "": sidebarClicked })}
        onClick={() => setIsSidebarShrinked((prev) => !prev)}
      >
        Open
      </div>
    </div>
  );
};

export default Sidebar;
