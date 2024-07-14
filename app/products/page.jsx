"use client";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUserStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Products = () => {
  const router = useRouter();

  const { user, loading, error, fetchUser, userFetched } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <Loader />;
  }

  if (!user && userFetched) {
    router.push("/login");
    return null;
  }

  return (
    <div className=" flex flex-col gap-8 w-full h-full">
      <div className=" grid grid-cols-6">
        <Input className=" col-span-5" />
        <div className=" col-span-1 flex justify-around items-center">
          <Button>Create</Button>
          <Button>Delete</Button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Products;
