import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { server } from "@/lib/utils";
import GlobalSelect from "./global-select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";

const CreateProduct = () => {
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  console.log(errors);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandRes, colorRes, sizeRes, categoryRes] = await Promise.all([
          axios.get(`${server}/brand/getAll`),
          axios.get(`${server}/color/getAll`),
          axios.get(`${server}/size/getAll`),
          axios.get(`${server}/category/getAll`),
        ]);
        setBrands(brandRes?.data?.brands);
        setColors(colorRes?.data?.colors);
        setSizes(sizeRes?.data?.sizes);
        setCategories(categoryRes?.data?.categories);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error fetching data",
        });
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${server}/product/create`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 201) {
        toast({
          variant: "success",
          title: "Product created successfully",
        });
      }
    } catch (error) {
      console.error(error);
      setError("root", {
        error: true,
        message: error?.response?.data?.message,
      });
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Error creating product",
      });
    }
  };

  return (
    <div className=" w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-2 w-full justify-betweem align-center flex flex-col gap-6"
      >
        {/* Product Id and stocks */}
        <div className="flex gap-4  justify-between align-center">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="productId">Product Id</Label>
            <Input
              type="text"
              id="productId"
              placeholder="product Id"
              className="w-full"
              {...register("productId", { required: true })}
            />
            {errors?.productId && (
              <p className="text-red-500 text-sm">
                {errors?.productId?.message}
              </p>
            )}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="stocks">Stocks</Label>
            <Input
              type="number"
              id="stocks"
              placeholder="99"
              className="w-full"
              {...register("stocks")}
            />
            {errors?.stocks && (
              <p className="text-red-500 text-sm">{errors?.stocks?.message}</p>
            )}
          </div>
        </div>

        {/* Product title*/}
        <div className="flex gap-4 justify-between align-center">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Product Title</Label>
            <Input
              id="title"
              placeholder="Enter product title"
              className="w-full"
              {...register("productTitle")}
            />
            {errors?.productTitle && (
              <p className="text-red-500 text-sm">
                {errors?.productTitle?.message}
              </p>
            )}
          </div>
        </div>

        {/* Brand and Category */}
        <div className="flex gap-5">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="brand">Brand</Label>
            <select
              id="brand"
              {...register("brand")}
              className="p-2 border rounded-md"
            >
              <option value="">Select a brand</option>
              {brands?.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              {...register("category")}
              className="p-2 border rounded-md"
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter product description"
            className="w-full"
            {...register("description")}
          />
        </div>

        {/* Variants */}
        <div className="space-y-4"></div>

        {errors.root && (
          <div className="text-red-500 text-sm text-center">
            {errors.root.message}
          </div>
        )}
        <Button disabled={isSubmitting} type="submit" className="">
          {isSubmitting ? "Creating product..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
};

export default CreateProduct;
