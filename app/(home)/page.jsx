"use client";

import Loader from "@/components/loader";
import useUserStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const { user, loading, error, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    router.push("/login");
    return;
  }

  return (
    <div className="p-8">

    </div>
  );
}
