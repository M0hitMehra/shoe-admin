"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import axios from "axios";
import { server } from "@/lib/utils";
import { toast } from "./ui/use-toast";

const editSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  price: z.number().positive({ message: "Price must be positive" }),
  stock: z
    .number()
    .int()
    .positive({ message: "Stock must be a positive integer" }),
  brand: z.string({ required_error: "Brand is required" }),
  color: z.string({ required_error: "Color is required" }),
  size: z.string({ required_error: "Size is required" }),
  category: z.string({ required_error: "Category is required" }),
  description: z.string().optional(),
});

const EditProduct = ({ data }) => {
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const buttonRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      title: data?.title,
      price: data?.price,
      stock: data?.stock,
      brand: data?.brand?._id,
      color: data?.color?._id,
      size: data?.size?._id,
      category: data?.category?._id,
      description: data?.description,
    },
  });

  useEffect(() => {
    // Fetch dropdown data from the server
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
      const response = await axios.put(
        `${server}/product/update/${data._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        toast({
          variant: "success",
          title: "Product updated successfully",
        });
      }
    } catch (error) {
      console.error("Failed to update product", error);
      toast({
        variant: "destructive",
        title: error?.response?.data?.message,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
        <CardDescription>Edit a product to change the values</CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[70vh]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Title */}
          <div className="grid w-full max-w-s items-center gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter product title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-2">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Price and Stock */}
          <div className="flex gap-5">
            <div className="grid w-full max-w-s items-center gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter product price"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div className="grid w-full max-w-s items-center gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                placeholder="Enter product stock"
                {...register("stock", { valueAsNumber: true })}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.stock.message}
                </p>
              )}
            </div>
          </div>

          {/* Brand and Size */}
          <div className="flex gap-5">
            <div className="grid w-full max-w-s items-center gap-2">
              <Label htmlFor="brand">Brand</Label>
              <select
                id="brand"
                {...register("brand")}
                className="p-2 border rounded-md"
                defaultValue={data?.brand?.name}
              >
                {/* <option value="">Select a brand</option> */}
                {brands?.map((brand) => (
                  <option
                    selected={brand._id === data?.brand?._id}
                    key={brand._id}
                    value={brand._id}
                    className="p-2"
                  >
                    {brand.name}
                  </option>
                ))}
              </select>
              {errors.brand && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.brand.message}
                </p>
              )}
            </div>
            <div className="grid w-full max-w-s items-center gap-2">
              <Label htmlFor="size">Size</Label>
              <select
                id="size"
                {...register("size")}
                className="p-2 border rounded-md"
                defaultValue={data?.size?.name}
              >
                {/* <option value="">Select a size</option> */}
                {sizes?.map((size) => (
                  <option
                    key={size._id}
                    value={size._id}
                    selected={size._id === data?.size?._id}
                  >
                    {size.name}
                  </option>
                ))}
              </select>
              {errors.size && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.size.message}
                </p>
              )}
            </div>
          </div>

          {/* Category and Color */}
          <div className="flex gap-5">
            <div className="grid w-full max-w-s items-center gap-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                {...register("category")}
                className="p-2 border rounded-md"
                defaultValue={data?.category?.name}
              >
                {/* <option value="">Select a category</option> */}
                {categories?.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                    selected={category._id === data?.category?._id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div className="grid w-full max-w-s items-center gap-2">
              <Label htmlFor="color">Color</Label>
              <select
                id="color"
                {...register("color")}
                className="p-2 border rounded-md"
                defaultValue={data?.color?.name}
              >
                {/* <option value="">Select a color</option> */}
                {colors?.map((color) => (
                  <option
                    selected={color._id === data?.color?._id}
                    key={color._id}
                    value={color._id}
                  >
                    {color.name}
                  </option>
                ))}
              </select>
              {errors.color && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.color.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="grid w-full max-w-s items-center gap-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              placeholder="Enter product description"
              {...register("description")}
              className="p-2 border rounded-md"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-2">
                {errors.description.message}
              </p>
            )}
          </div>

          <Button ref={buttonRef} type="submit" className="hidden w-full mt-5">
            Save
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => {
            buttonRef?.current?.click();
          }}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditProduct;
