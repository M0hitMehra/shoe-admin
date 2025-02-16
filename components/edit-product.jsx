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
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "./ui/button";
import { Plus, Trash2 } from "lucide-react";
import axios from "axios";
import { server } from "@/lib/utils";
import { toast } from "./ui/use-toast";

const variantSchema = z.object({
  color: z
    .string({ required_error: "Color is required" })
    .min(1, "Color cannot be empty"),
  size: z
    .string({ required_error: "Size is required" })
    .min(1, "Size cannot be empty"),
  price: z
    .number({
      invalid_type_error: "Price must be in number",
      required_error: "Price is required",
    })
    .min(1, "Price cannot be empty")
    .positive({ message: "Price must be positive" }),
  stock: z
    .number({
      invalid_type_error: "Stock must be in number",
      required_error: "Stock is required",
    })
    .min(1, "Stock cannot be empty")
    .int()
    .positive({ message: "Stock must be a positive integer" }),
});

const editSchema = z.object({
  productId: z
    .string({ required_error: "Product ID is required" })
    .min(1, "Product ID cannot be empty"),
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title cannot be empty"),
  stock: z
    .number()
    .int()
    .positive({ message: "Stock must be a positive integer" }),
  brand: z
    .string({ required_error: "Brand is required" })
    .min(1, "Brand cannot be empty"),
  category: z
    .string({ required_error: "Category is required" })
    .min(1, "Category cannot be empty"),
  description: z.string().optional(),
  variants: z.array(variantSchema),
  otherDetails: z.object({
    productStory: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }),
    productDetails: z.object({
      title: z.string().optional(),
      description: z.array(z.string()).optional(),
    }),
    manufacturAddress: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }),
    countoryOrigin: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }),
  }),
});

const EditProduct = ({ data }) => {
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const buttonRef = useRef();

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      productId: data?.productId,
      title: data?.title,
      stock: data?.stock,
      brand: data?.brand?._id,
      category: data?.category?._id,
      description: data?.description,
      variants:
        data?.variants?.map((variant) => ({
          color: variant.color._id,
          size: variant.size._id,
          price: variant.price,
          stock: variant.stock,
        })) || [],
      otherDetails: {
        productStory: {
          title: data?.otherDetails?.productStory?.title || "",
          description: data?.otherDetails?.productStory?.description || "",
        },
        productDetails: {
          title: data?.otherDetails?.productDetails?.title || "",
          description: data?.otherDetails?.productDetails?.description || [],
        },
        manufacturAddress: {
          title: data?.otherDetails?.manufacturAddress?.title || "",
          description: data?.otherDetails?.manufacturAddress?.description || "",
        },
        countoryOrigin: {
          title: data?.otherDetails?.countoryOrigin?.title || "",
          description: data?.otherDetails?.countoryOrigin?.description || "",
        },
      },
    },
  });

  const currentDescription = watch("otherDetails.productDetails.description") || [];
  
  // Add a new empty pointer
  const addPointer = () => {
    setValue("otherDetails.productDetails.description", [...currentDescription, ""]);
  };

  // Remove a pointer at specific index
  const removePointer = (indexToRemove) => {
    setValue(
      "otherDetails.productDetails.description",
      currentDescription.filter((_, index) => index !== indexToRemove)
    );
  };

  // Update a specific pointer
  const updatePointer = (index, value) => {
    const newDescription = [...currentDescription];
    newDescription[index] = value;
    setValue("otherDetails.productDetails.description", newDescription);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

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
        toast({
          variant: "destructive",
          title: "Error fetching data",
        });
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (formData) => {
    console.log(formData);
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
        <CardTitle>Edit Product ({data?._id})</CardTitle>
        <CardDescription>Edit a product and its variants</CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[70vh]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Product ID and Title */}
          <div className="flex gap-5">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="productId">Product ID</Label>
              <Input
                id="productId"
                placeholder="Enter product ID"
                {...register("productId")}
              />
              {errors.productId && (
                <p className="text-red-500 text-sm">
                  {errors.productId.message}
                </p>
              )}
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter product title"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
          </div>

          {/* Stock */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="stock">Overall Stock</Label>
            <Input
              id="stock"
              type="number"
              placeholder="Enter total product stock"
              {...register("stock", { valueAsNumber: true })}
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock.message}</p>
            )}
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
                  <option
                    key={brand._id}
                    value={brand._id}
                    selected={brand._id === data?.brand?._id}
                  >
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
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              placeholder="Enter product description"
              {...register("description")}
              className="p-2 border rounded-md"
              rows={4}
            />
          </div>

          {/* Variants */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Product Variants</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({ color: "", size: "", price: "", stock: "" })
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Variant
              </Button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Variant {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Color</Label>
                    <select
                      {...register(`variants.${index}.color`)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select color</option>
                      {colors?.map((color) => (
                        <option key={color._id} value={color._id}>
                          {color.name}
                        </option>
                      ))}
                    </select>

                    {errors?.variants?.[index]?.color && (
                      <p className="text-red-500 text-sm">
                        {errors?.variants?.[index]?.color?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Size</Label>
                    <select
                      {...register(`variants.${index}.size`)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select size</option>
                      {sizes?.map((size) => (
                        <option key={size._id} value={size._id}>
                          {size.name}
                        </option>
                      ))}
                    </select>

                    {errors?.variants?.[index]?.size && (
                      <p className="text-red-500 text-sm">
                        {errors?.variants?.[index]?.size?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      {...register(`variants.${index}.price`, {
                        valueAsNumber: true,
                      })}
                      placeholder="Enter price"
                    />

                    {errors?.variants?.[index]?.price && (
                      <p className="text-red-500 text-sm">
                        {errors?.variants?.[index]?.price?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Stock</Label>
                    <Input
                      type="number"
                      {...register(`variants.${index}.stock`, {
                        valueAsNumber: true,
                      })}
                      placeholder="Enter stock"
                    />

                    {errors?.variants?.[index]?.stock && (
                      <p className="text-red-500 text-sm">
                        {errors?.variants?.[index]?.stock?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Details */}
          <div className="space-y-4">
            <Label>Other Details</Label>

            {/* Product Story */}
            <div className="space-y-2">
              <Input
                {...register("otherDetails.productStory.title")}
                placeholder="Product Story Title"
              />
              <textarea
                {...register("otherDetails.productStory.description")}
                placeholder="Product Story Description"
                className="w-full p-2 border rounded-md"
                rows={3}
              />
            </div>

            {/* Product Details */}
            <div className="space-y-2 flex flex-col gap-4 p-1">
              <div className="grid w-full gap-2">
                <Label htmlFor="productDetailsTitle">
                  Product Details Title
                </Label>
                <Input
                  id="productDetailsTitle"
                  {...register("otherDetails.productDetails.title")}
                  placeholder="Product Details Title"
                />
              </div>

              {/* <div className="grid w-full gap-2">
                <Label htmlFor="productDetailsDescription">
                  Product Details (one per line)
                </Label>
                <textarea
                  id="productDetailsDescription"
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  placeholder="Enter product details (one per line)"
                  onChange={handleDescriptionChange}
                  value={displayValue || ""}
                  rows={5}
                  // onKeyDown={handleKeyDown}
                />
              </div> */}


<div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Product Details Points</Label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={addPointer}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Point
          </Button>
        </div>

        <div className="space-y-2">
          {currentDescription.map((point, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={point}
                onChange={(e) => updatePointer(index, e.target.value)}
                placeholder={`Detail point ${index + 1}`}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removePointer(index)}
                className="shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {currentDescription.length === 0 && (
          <p className="text-sm text-gray-500 italic">
            No detail points added yet. Click 'Add Point' to begin.
          </p>
        )}
      </div>


              
            </div>

            {/* Manufacturing Address */}
            <div className="space-y-2">
              <Input
                {...register("otherDetails.manufacturAddress.title")}
                placeholder="Manufacturing Address Title"
              />
              <Input
                {...register("otherDetails.manufacturAddress.description")}
                placeholder="Manufacturing Address"
              />
            </div>

            {/* Country Origin */}
            <div className="space-y-2">
              <Input
                {...register("otherDetails.countoryOrigin.title")}
                placeholder="Country Origin Title"
              />
              <Input
                {...register("otherDetails.countoryOrigin.description")}
                placeholder="Country Origin"
              />
            </div>
          </div>

          <Button ref={buttonRef} type="submit" className="hidden">
            Save Changes
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => buttonRef?.current?.click()}>
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditProduct;
