"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rate from "rc-rate";
import "rc-rate/assets/index.css"; // Ensure you import the styles for rc-rate
import StoreCard from "./StoreCard";

import { IProduct } from "@/types";

import ProductCard from "@/app/(withCommonLayout)/products/[productId]/ProductMiniCard";
import { RootState } from "@/app/redux/store";

import { useRouter } from "next/navigation";
import ReactImageMagnify from "react-image-magnify";
import "./ProductDetailsCard.css";
import Image from "next/image";
import { calculateDiscountPercentage } from "../sharred";
import { useDisclosure } from "@nextui-org/react";
import CheckoutModal from "../modal/CheckoutModal";

const ProductDetailsCard = ({
  product,
  handleAddToCart,
  handleFollowShop,
  quantity,
  setQuantity,
  handleBuyProduct,
}: {
  product: IProduct;
  handleAddToCart?: any;
  handleFollowShop?: any;
  quantity: any;
  setQuantity: any;
  handleBuyProduct: any;
}) => {
  const { images, id, name, discount, price, stock, review } = product;
  console.log("images", images);

  const [currentImage, setCurrentImage] = useState(images[0]);

  const dispatch = useDispatch();
  const router = useRouter();
  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const {
    isOpen: isCheckoutModalOpen,
    onOpen: onCheckoutModalOpen,
    onOpenChange: onCheckoutModalChange,
    onClose,
  } = useDisclosure();
  // calculate discount percentage
  const { discountPercentage, discountPrice } = calculateDiscountPercentage(
    Number(price),
    Number(discount)
  );

  const handleCurrentImage = (image: string) => {
    setCurrentImage(image);
  };

  const handleIncrement = () => {
    if (!userId) {
      return router.push("/login");
    }
  };

  // handle buy product

  return (
    <div className="bg-white">
      <div className="flex lg:flex-row flex-col gap-4">
        {/* <section className="col-span-4"> */}
        <div className="lg:w-4/12   mx-auto">
          {/* <div className=""> */}
          {/* <img
            src={images[0]}
            className="w-full h-auto object-cover"
            alt={`Product Image`}
          /> */}
          {/* <img
            alt="productImage"
            className="w-auto h-[500px] " // Ensure the image scales well and retains its aspect ratio
            src={currentImage} // Dynamically render the product image
          /> */}
          <Image src={images[0]} width={500} height={500} alt="" />
          {/* <div id="imageMagnifier">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: currentImage,
                },
                largeImage: {
                  src: currentImage,
                  width: 1500,
                  height: 1000,
                },
              }}
            />
          </div> */}
          {/* <div className="lg:block hidden">
            <div className="flex items-center  gap-2 mt-2">
              {images?.map((image, index) => (
                <ProductCard
                  key={index}
                  currentImage={currentImage}
                  handleCurrentImage={handleCurrentImage}
                  image={image}
                />
              ))}
            </div>
          </div> */}
        </div>
        {/* </section> */}
        {/* <section className="col-span-8"> */}
        <div className="lg:w-4/12 lg:space-y-4 space-y-2 w-full">
          <p className="md:text-2xl text-lg">{name}</p>
          <div className="flex items-center gap-2">
            <div>
              <Rate
                allowHalf={false}
                className="text-[#FACA51] text-xl "
                count={5}
                value={5}
              />
            </div>
            <p className="text-[#136cff] lg:block hidden">
              {review.length} Ratings
            </p>
          </div>
          <p className="text-[12px] md:text-[14px] lg:block hidden">
            <span className="text-[#9e9e9e] mr-2">Brand:</span>
            <span className="text-[#136cff]">No Brand</span>
          </p>
          {/* <p> */}
          <div className="lg:block flex lg:gap-0 gap-3 items-center">
            <p className="md:text-3xl text-xl text-primary">
              ৳{" "}
              <span className="font-bold md:font-normal">{discountPrice}</span>
            </p>
            <div className="items-center flex gap-2 ">
              <p className="md:text-[16px] text-[14px] line-through text-secondary">
                ৳ <span>{price}</span>
              </p>
              <p className="md:text-[16px] text-[14px]">
                -{discountPercentage}%
              </p>
            </div>
          </div>

          <div className="lg:block hidden">
            <div className="flex items-center">
              <span className="md:pr-8 text-[#757575] text-sm">Quantity</span>

              {/* minus button */}
              <button
                onClick={() => setQuantity((quantity: any) => quantity - 1)}
                disabled={quantity === 1}
                className="disabled:cursor-not-allowed cursor-pointer bg-[#EFF0F5] disabled:hover:text-[#9E9E9E] text-[#9E9E9E] disabled:bg-[#FAFAFA] hover:bg-[#DADADA] hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-7   p-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14"
                  />
                </svg>
              </button>
              <span className="mx-4">{quantity}</span>

              {/* plus button */}
              <button
                disabled={quantity === 10}
                onClick={() => setQuantity((quantity: any) => quantity + 1)}
                className="disabled:cursor-not-allowed cursor-pointer bg-[#EFF0F5] disabled:hover:text-[#9E9E9E] text-[#9E9E9E] disabled:bg-[#FAFAFA] hover:bg-[#DADADA] hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-7  p-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex  items-center  sm:gap-2">
            <span className=" w-full">
              <button
                className="md:block  bg-[#2abbe8] py-2 w-full text-white text-center"
                onClick={onCheckoutModalOpen}
              >
                Buy Now
              </button>
            </span>
            <button
              className="cursor-pointer py-2  md:my-0 my-2 w-full  bg-primary text-white text-center"
              onClick={() => handleAddToCart()}
            >
              Add To Cart
            </button>
          </div>

          {/* </div> */}
        </div>
        <div className="lg:w-4/12 w-full lg:block hidden">
          <StoreCard handleFollowShop={handleFollowShop} product={product} />
        </div>

        {/* </section> */}
      </div>
      <div className="lg:block hidden">
        <div className="flex items-center  gap-2 mt-2">
          {images?.map((image, index) => (
            <ProductCard
              key={index}
              currentImage={currentImage}
              handleCurrentImage={handleCurrentImage}
              image={image}
            />
          ))}
        </div>
      </div>
      <CheckoutModal
        // handleCreateOrder={handleCreateOrder}
        isOpen={isCheckoutModalOpen}
        // isSuccess={isSuccess}
        onOpenChange={onCheckoutModalChange}
        isForBuy={true}
      />
    </div>
  );
};

export default ProductDetailsCard;
