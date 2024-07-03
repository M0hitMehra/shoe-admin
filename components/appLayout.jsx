"use client";

import React, { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { cn } from "@/lib/utils";

const AppLayout = ({ children }) => {
  const [isSidebarShrinked, setIsSidebarShrinked] = useState(false);

  return (
    <div className={cn(" h-screen w-screen overflow-auto  flex ")}>
      <div className={cn(" w-[10%] relative", { " w-[20%]": isSidebarShrinked })}>
        <Sidebar setIsSidebarShrinked={setIsSidebarShrinked} />
      </div>
      <div className={cn("w-[90%]", { " w-[80%]": isSidebarShrinked })}>
        <Navbar />
        <div className=" border-8 border-purple-600 h-[200vh] w-full">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
