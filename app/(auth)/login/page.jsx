"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { server } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Loader as LoadingIcon, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import useUserStore from "@/store/useAuthStore";
import Loader from "@/components/loader";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password should be of at least 8 characters")
    .nonempty("Password is required"),
});

const Login = () => {
  const { user, loading, error, fetchUser, userFetched } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${server}/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (data?.success) {
        setIsLoading(false);
        toast({
          title: "Logged in successfully",
          description: `Welcome to the store ${data?.user?.firstName}`,
        });
        router.push("/dashboard");
      }
      reset();
    } catch (error) {
       setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.response?.data?.message,
      });
      reset();
    }
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (loading) {
    return <Loader />;
  }

  if (user && userFetched) {
    router.push("/");
    return null;
  }

  return (
    <div className="h-[90vh] w-full flex justify-center items-center">
      <div className="md:w-1/2 w-full p-8 rounded-md shadow-md shadow-black flex flex-col justify-center items-center gap-8">
        <div>
          <h1>Login (Only for admins and super admins)</h1>
          <Separator />
        </div>

        <form
          className="w-full flex flex-col justify-center items-center gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid w-full max-w-s items-center gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid w-full max-w-s items-center gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder={"Enter your password"}
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-2 top-2"
                onClick={handlePasswordVisibility}
              >
                {!passwordVisible ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={!isDirty}>
            {isLoading ? (
              <LoadingIcon className="animate-spin m-auto h-full w-full" />
            ) : (
              <>Login</>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
