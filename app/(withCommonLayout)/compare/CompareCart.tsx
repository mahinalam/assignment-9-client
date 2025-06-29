"use client";

import React from "react";
import "rc-rate/assets/index.css";
import { TiDelete } from "react-icons/ti";
import { Button } from "@nextui-org/button";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { RootState } from "@/app/redux/store";
import { useCreateCartMutation } from "@/app/redux/features/cart/cartApi";
import { calculateDiscountPercentage } from "@/app/components/sharred";
import { useDeleteCompareProductMutation } from "@/app/redux/features/compare/compareApi";

const CompareCart = ({ product }: { product: any }) => {
  const { id, images, name, price, stock, category, shop, discount } =
    product?.product;
  const { discountPercentage, discountPrice } = calculateDiscountPercentage(
    Number(price),
    Number(discount),
  );

  const userId = useSelector((state: RootState) => state.auth?.user?.userId);
  const router = useRouter();

  const [createCart] = useCreateCartMutation();
  const [removeProduct] = useDeleteCompareProductMutation();

  // add to cart
  const handleAddToCart = async () => {
    if (!userId) {
      return router.push("/login");
    }

    let cartInfo = {
      productId: id,
      shopId: shop.id,
      quantity: 1,
      price: discountPrice,
    };

    try {
      const res = await createCart(cartInfo).unwrap();

      if (res?.success) {
        toast.success("Product added to cart.");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  // remove compare product
  const handleRemoveCompareProduct = async (productId: string) => {
    if (productId) {
      try {
        await removeProduct(productId).unwrap();
      } catch (error: any) {
        toast.error(error.data.message);
      }
    }
  };

  return (
    <div className="flex-shrink-0 max-w-[300px] w-full pb-5">
      <div className="  p-2 border-border border-1">
        <span
          className="inline-flex items-center cursor-pointer"
          onClick={() => handleRemoveCompareProduct(id)}
        >
          <TiDelete size={20} />
          <p className="font-medium text-sm">Remove</p>
        </span>
      </div>
      <div className="w-full">
        <img
          alt=""
          className="border-border border-1 w-full h-auto object-contain max-h-[300px]"
          src={images[0]}
        />
      </div>

      {/* Name should wrap and not overflow */}
      <p
        className="text-sm font-medium border-b-1 border-border border-1 p-2 break-words 
  line-clamp-none sm:line-clamp-2"
      >
        {name}
      </p>

      <p className="p-2 border-border border-1">{category?.name}</p>
      <div className="flex gap-2 p-2 border-border border-1">
        <p className="text-primary font-bold">৳{discountPrice}</p>
        <p className="line-through text-gray-400">৳{price}</p>
      </div>
      <p className="p-2 border-border border-1">
        {stock > 0 ? "In Stock" : "Out of Stock"}
      </p>
      <div className="border-border border-1 pb-2 p-2">
        <Button
          className=" bg-primary mt-3 text-white"
          size="sm"
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default CompareCart;
