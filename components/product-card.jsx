"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageCarousel from "./image-carousel";
import { Button } from "./ui/button";
import axios from "axios";
import { server } from "@/lib/utils";
import { toast } from "./ui/use-toast";
import GlobalDialog from "./global-dialog";
import EditProduct from "./edit-product";
import { Separator } from "./ui/separator";

const ProductCard = ({ data, setApiCaller, name }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(() => data?.images?.map((image) => image?.url));
  }, [data]);

  const deleteProductHandler = async () => {
    try {
      const response = await axios.delete(
        `${server}/product/delete/${data?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        setApiCaller((prev) => !prev);
        toast({
          variant: "success",
          title: "Product deleted successfully",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Failed to delete a product",
        description: error?.response?.data?.message,
      });
    }
  };

  return (
    <Card className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] xl:w-[19%] p-1 h-[500px] relative">
      <CardHeader>
        <CardTitle>
          {data?.title?.slice(0, 30)}
          {data?.title?.length > 30 ? "..." : ""}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ImageCarousel images={images} />
        <CardDescription className="flex flex-col gap-2 my-1">
          {data?.description?.slice(0, 130)}
          {data?.description?.length > 130 ? "..." : ""}
          <Separator />
          <span className=" text-base font-semibold break-words">
            <span className="align-center flex items-center justify-center">
              Product Id :
            </span>
            <span className="align-center flex items-center justify-center">
              {data?._id}
            </span>
          </span>
        </CardDescription>
      </CardContent>
      <CardFooter className="w-full absolute bottom-0">
        <div className="w-full flex justify-around items-center gap-3">
          <Button
            className="w-full"
            variant={"destructive"}
            onClick={deleteProductHandler}
          >
            Delete
          </Button>
          <GlobalDialog
            trigger={<Button className="w-full">Edit</Button>}
            title={<h1>{name}</h1>}
            className={"max-w-screen max-h-screen"}
          >
            <EditProduct data={data} />
          </GlobalDialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
