"use client";

import Loader from "@/components/loader";
import useUserStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const { user, loading, error, fetchUser,userFetched } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);


  useEffect(() => {
    if (!loading && !user && userFetched) {
      router.push("/login");
    }
  }, [loading, user, userFetched, router]);


  if (loading) {
    return <Loader />;
  }

   

  return <div className="p-8"></div>;
}
