"use client";

import React, { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { cn } from "@/lib/utils";

const AppLayout = ({ children }) => {
  const [isSidebarShrinked, setIsSidebarShrinked] = useState(false);

  return (
    <div className={cn(" grid grid-cols-12 ")}>
      <div className={cn("col-span-1", { " col-span-2": isSidebarShrinked })}>
        <Sidebar setIsSidebarShrinked={setIsSidebarShrinked} />
      </div>
      <div className={cn("col-span-11", { " col-span-10": isSidebarShrinked })}>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
