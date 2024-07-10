"use client";

import Loader from "@/components/loader";
import useUserStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Products = () => {
  const router = useRouter();

  const { user, loading, error, fetchUser,userFetched } = useUserStore();

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

  return <div>Products</div>;
};

export default Products;
