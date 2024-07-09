"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  BookTypeIcon,
  BoxIcon,
  LayoutDashboard,
  ListOrderedIcon,
  StoreIcon,
} from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const sidebarArray = [
    {
      icon: <LayoutDashboard />,
      title: "Dashboard",
      url: "/dashboard",
    },

    {
      icon: <BoxIcon />,
      title: "Products",
      url: "/products",
    },

    {
      icon: <BookTypeIcon />,
      title: "Categories",
      url: "/categories",
    },

    {
      icon: <StoreIcon />,
      title: "Brands",
      url: "/brands",
    },

    {
      icon: <ListOrderedIcon />,
      title: "Orders",
      url: "/orders",
    },
  ];

  const [selectedOne, setSelectedOne] = useState(window.location.pathname);

  return (
    <div
      className={cn(
        " bg-purple-700 h-screen p-5 pt-8 md:w-20 w-16 relative  duration-500",
        {
          "md:w-72 w-36": open,
        }
      )}
    >
      <ArrowLeftIcon
        className={cn(
          " bg-white rounded-full absolute -right-3 cursor-pointer duration-500 border border-purple-700",
          { " rotate-180": !open }
        )}
        onClick={() => setOpen((prev) => !prev)}
      />

      <ul className=" flex flex-col gap-10 pt-10 justify-between">
        {sidebarArray?.map((item, i) => (
          <SidebarTabs
            key={i}
            icon={item?.icon}
            title={item?.title}
            state={open}
            url={item?.url}
            selectedOne={selectedOne}
            setSelectedOne={setSelectedOne}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

function SidebarTabs({ title, icon, state, url, selectedOne, setSelectedOne }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(url);
    setSelectedOne(url);
  };

  return (
    <>
      {!state ? (
        <li
          className="flex gap-4 text-neutral-50 font-medium cursor-pointer relative hover:text-gray-300 group justify-center items-center"
          onClick={handleClick}
        >
          <span
            className={cn("", {
              "p-3 bg-white rounded-full text-black hover:text-black":
                selectedOne === url,
            })}
          >
            {icon}
          </span>
          <span
            className={cn("break-before-all break-words invisible", {
              "group-hover:visible border left-16 px-3 py-1 absolute bg-neutral-500 text-neutral-50 rounded-md":
                !state,
            })}
          >
            {title}
          </span>
        </li>
      ) : (
        <li
          className={cn(
            "flex gap-4 text-neutral-50 font-medium cursor-pointer hover:text-gray-300 group",
            {
              "p-3 bg-white rounded-full text-black hover:text-black":
                selectedOne === url,
            }
          )}
          onClick={handleClick}
        >
          <span>{icon}</span>
          <span
            className={cn("break-before-all break-words hidden", {
              block: state,
            })}
          >
            {title}
          </span>
        </li>
      )}
    </>
  );
}
