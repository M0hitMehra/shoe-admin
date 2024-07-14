"use client";

import React, { useEffect, useState } from "react";

import { cn, server } from "@/lib/utils";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import GlobalAlert from "./global-alert";
import axios from "axios";
import GlobalTooltip from "./global-tooltip";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useAuthStore";

const Sidebar = () => {
  const router = useRouter();
  const { user } = useUserStore();

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
  const [open, setOpen] = useState(true);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/auth/logout`, {
        withCredentials: true,
      });
      if (data?.success) {
        router.push("/login");
        toast({
          title: "Logged out successfully",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: error?.response?.data?.message,
        variant: "destructive",
      });
    }
  };

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
        " bg-purple-700 h-screen p-5 pt-8 md:w-20 w-16 relative  duration-500 flex items-center  flex-col",
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

      {user && (
        <GlobalAlert
          trigger={
            <div className=" w-full  absolute bottom-5  flex justify-center items-center ">
              <GlobalTooltip content={<p>Logout</p>}>
                <Button
                  variant={"destructive"}
                  className={cn(
                    " p-1 px-2 rounded-full cursor-pointer tranistion duration-500 shadow-lg text-white",
                    {
                      " rounded-lg p-2 px-4 text-md font-normal gap-2": open,
                    }
                  )}
                >
                  <Power />
                  <span className={cn("", { " hidden": !open })}>Logout</span>
                </Button>
              </GlobalTooltip>
            </div>
          }
          heading={"Are you sure you want to log out?"}
          description={
            "Logging out from your account will result limited functionality of application."
          }
          confirmButtonTitle={"Logout"}
          confirmButtonHandler={logoutHandler}
        />
      )}
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
