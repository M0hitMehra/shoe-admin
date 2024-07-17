"use client";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUserStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "@/lib/utils";
import ProductCard from "@/components/product-card";
import { Separator } from "@/components/ui/separator";

const Products = () => {
  const router = useRouter();
  const { user, loading, error, fetchUser, userFetched } = useUserStore();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(9);
  const [apiCaller, setApiCaller] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${server}/products`, {
          params: {
            page,
            limit,
            search,
          },
        });
        setProducts(data.products);
        setTotalPages(Math.ceil(data.pagination.total / limit));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page, search, apiCaller]);

  useEffect(() => {
    if (!loading && !user && userFetched) {
      router.push("/login");
    }
  }, [loading, user, userFetched, router]);

  if (loading) {
    return <Loader />;
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="flex flex-col gap-8 w-full h-full p-4">
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <Input
          className="col-span-4"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search products..."
        />
        <div className="col-span-2 flex justify-around items-center">
          <Button>Create</Button>
          <Button>Delete</Button>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col justify-center w-full items-center gap-5">
          <div className="flex justify-center items-center gap-10 flex-wrap w-full">
            {products.map((product, i) => (
              <ProductCard
                key={i}
                data={product}
                setApiCaller={setApiCaller}
                name={
                  user?.firstName?.trim() +
                  " " +
                  user?.lastName?.trim() +
                  `(${user?._id})`
                }
              />
            ))}
          </div>
          <Separator />
          <div className="flex justify-center items-center gap-5 mb-6">
            <Button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span>
              Page {page} of {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
