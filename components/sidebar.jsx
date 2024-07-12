"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  BookTypeIcon,
  BoxIcon,
  LayoutDashboard,
  ListOrderedIcon,
  Menu,
  Power,
  StoreIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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

  const [selectedOne, setSelectedOne] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set initial state based on screen size
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
      setSelectedOne(window.location.pathname);

      // Update the state if the window is resized
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setOpen(false);
        } else {
          setOpen(true);
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div
      className={cn(
        " bg-purple-700 h-screen p-5 pt-8 md:w-20 w-16 relative  duration-500",
        {
          "md:w-72 w-16": open,
        }
      )}
    >
      <ArrowLeftIcon
        className={cn(
          " bg-white rounded-full absolute hidden md:block  -right-3 cursor-pointer duration-500 border border-purple-700",
          { "  rotate-180": !open }
        )}
        onClick={() => setOpen((prev) => !prev)}
      />

      <Sheet>
        <SheetTrigger>
          <Menu
            className={cn(
              " text-white rounded-full   md:hidden block cursor-pointer duration-500 border border-purple-700",
              { "  rotate-180": !open }
            )}
          />
        </SheetTrigger>
        <SheetContent className="bg-purple-700 ">
          <SheetHeader>
            {/* <SheetTitle>Are you absolutely sure?</SheetTitle> */}
            <SheetDescription className=" flex flex-col gap-10 pt-10 justify-between">
              {sidebarArray?.map((item, i) => (
                <SmallScreenSidebarTabs
                  key={i}
                  icon={item?.icon}
                  title={item?.title}
                  state={open}
                  url={item?.url}
                  selectedOne={selectedOne}
                  setSelectedOne={setSelectedOne}
                />
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

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

      <Power
        className={cn(
          " p-1 rounded-full absolute bottom-5 cursor-pointer duration-500 border border-red-700 bg-red-700 text-white",
          { "  rotate-180": !open },
          { " w-full": open }
        )}
        onClick={() => setOpen((prev) => !prev)}
      />
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
            " hidden md:flex gap-4 text-neutral-50 font-medium cursor-pointer hover:text-gray-300 group",
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

function SmallScreenSidebarTabs({
  title,
  icon,
  state,
  url,
  selectedOne,
  setSelectedOne,
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(url);
    setSelectedOne(url);
  };

  return (
    <div>
      <li
        className={cn(
          " flex gap-4 text-neutral-50 font-medium cursor-pointer hover:text-gray-300 group",
          {
            "p-3 bg-white rounded-full text-black hover:text-black":
              selectedOne === url,
          }
        )}
        onClick={handleClick}
      >
        <span>{icon}</span>
        <span
          className={cn("break-before-all break-words", {
            block: state,
          })}
        >
          {title}
        </span>
      </li>
    </div>
  );
}
