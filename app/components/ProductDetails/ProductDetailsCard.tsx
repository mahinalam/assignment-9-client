// "use client";

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Rate from "rc-rate";
// import "rc-rate/assets/index.css"; // Ensure you import the styles for rc-rate
// import StoreCard from "./StoreCard";

// import { IProduct } from "@/types";

// import ProductCard from "@/app/(withCommonLayout)/products/[productId]/ProductMiniCard";
// import { RootState } from "@/app/redux/store";

// import { useRouter } from "next/navigation";
// import ReactImageMagnify from "react-image-magnify";
// import "./ProductDetailsCard.css";
// import Image from "next/image";
// import { calculateDiscountPercentage } from "../sharred";
// import { useDisclosure } from "@nextui-org/react";
// import CheckoutModal from "../modal/CheckoutModal";

// const ProductDetailsCard = ({
//   product,
//   handleAddToCart,
//   handleFollowShop,
//   quantity,
//   setQuantity,
//   handleBuyProduct,
// }: {
//   product: IProduct;
//   handleAddToCart?: any;
//   handleFollowShop?: any;
//   quantity: any;
//   setQuantity: any;
//   handleBuyProduct: any;
// }) => {
//   const { images, id, name, discount, price, stock, review } = product;
//   console.log("images", images);

//   const [currentImage, setCurrentImage] = useState(images[0]);

//   const dispatch = useDispatch();
//   const router = useRouter();
//   const userId = useSelector((state: RootState) => state.auth.user?.userId);

//   const {
//     isOpen: isCheckoutModalOpen,
//     onOpen: onCheckoutModalOpen,
//     onOpenChange: onCheckoutModalChange,
//     onClose,
//   } = useDisclosure();
//   // calculate discount percentage
//   const { discountPercentage, discountPrice } = calculateDiscountPercentage(
//     Number(price),
//     Number(discount)
//   );

//   const handleCurrentImage = (image: string) => {
//     setCurrentImage(image);
//   };

//   const handleIncrement = () => {
//     if (!userId) {
//       return router.push("/login");
//     }
//   };

//   // handle buy product

//   return (
//     <div className="bg-white">
//       <div className="flex lg:flex-row flex-col gap-4">
//         {/* <section className="col-span-4"> */}
//         <div className="lg:w-4/12   mx-auto">
//           {/* <div className=""> */}
//           {/* <img
//             src={images[0]}
//             className="w-full h-auto object-cover"
//             alt={`Product Image`}
//           /> */}
//           {/* <img
//             alt="productImage"
//             className="w-auto h-[500px] " // Ensure the image scales well and retains its aspect ratio
//             src={currentImage} // Dynamically render the product image
//           /> */}
//           <Image src={images[0]} width={500} height={500} alt="" />
//           {/* <div id="imageMagnifier">
//             <ReactImageMagnify
//               {...{
//                 smallImage: {
//                   alt: "Wristwatch by Ted Baker London",
//                   isFluidWidth: true,
//                   src: currentImage,
//                 },
//                 largeImage: {
//                   src: currentImage,
//                   width: 1500,
//                   height: 1000,
//                 },
//               }}
//             />
//           </div> */}
//           {/* <div className="lg:block hidden">
//             <div className="flex items-center  gap-2 mt-2">
//               {images?.map((image, index) => (
//                 <ProductCard
//                   key={index}
//                   currentImage={currentImage}
//                   handleCurrentImage={handleCurrentImage}
//                   image={image}
//                 />
//               ))}
//             </div>
//           </div> */}
//         </div>
//         {/* </section> */}
//         {/* <section className="col-span-8"> */}
//         <div className="lg:w-4/12 lg:space-y-4 space-y-2 w-full">
//           <p className="md:text-2xl text-lg">{name}</p>
//           <div className="flex items-center gap-2">
//             <div>
//               <Rate
//                 allowHalf={false}
//                 className="text-[#FACA51] text-xl "
//                 count={5}
//                 value={5}
//               />
//             </div>
//             <p className="text-[#136cff] lg:block hidden">
//               {review.length} Ratings
//             </p>
//           </div>
//           <p className="text-[12px] md:text-[14px] lg:block hidden">
//             <span className="text-[#9e9e9e] mr-2">Brand:</span>
//             <span className="text-[#136cff]">No Brand</span>
//           </p>
//           {/* <p> */}
//           <div className="lg:block flex lg:gap-0 gap-3 items-center">
//             <p className="md:text-3xl text-xl text-primary">
//               ৳{" "}
//               <span className="font-bold md:font-normal">{discountPrice}</span>
//             </p>
//             <div className="items-center flex gap-2 ">
//               <p className="md:text-[16px] text-[14px] line-through text-secondary">
//                 ৳ <span>{price}</span>
//               </p>
//               <p className="md:text-[16px] text-[14px]">
//                 -{discountPercentage}%
//               </p>
//             </div>
//           </div>

//           <div className="lg:block hidden">
//             <div className="flex items-center">
//               <span className="md:pr-8 text-[#757575] text-sm">Quantity</span>

//               {/* minus button */}
//               <button
//                 onClick={() => setQuantity((quantity: any) => quantity - 1)}
//                 disabled={quantity === 1}
//                 className="disabled:cursor-not-allowed cursor-pointer bg-[#EFF0F5] disabled:hover:text-[#9E9E9E] text-[#9E9E9E] disabled:bg-[#FAFAFA] hover:bg-[#DADADA] hover:text-white"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="size-7   p-1"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M5 12h14"
//                   />
//                 </svg>
//               </button>
//               <span className="mx-4">{quantity}</span>

//               {/* plus button */}
//               <button
//                 disabled={quantity === 10}
//                 onClick={() => setQuantity((quantity: any) => quantity + 1)}
//                 className="disabled:cursor-not-allowed cursor-pointer bg-[#EFF0F5] disabled:hover:text-[#9E9E9E] text-[#9E9E9E] disabled:bg-[#FAFAFA] hover:bg-[#DADADA] hover:text-white"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="size-7  p-1"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M12 4.5v15m7.5-7.5h-15"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           <div className="flex  items-center  sm:gap-2">
//             <span className=" w-full">
//               <button
//                 className="md:block  bg-[#2abbe8] py-2 w-full text-white text-center"
//                 onClick={onCheckoutModalOpen}
//               >
//                 Buy Now
//               </button>
//             </span>
//             <button
//               className="cursor-pointer py-2  md:my-0 my-2 w-full  bg-primary text-white text-center"
//               onClick={() => handleAddToCart()}
//             >
//               Add To Cart
//             </button>
//           </div>

//           {/* </div> */}
//         </div>
//         <div className="lg:w-4/12 w-full lg:block hidden">
//           <StoreCard handleFollowShop={handleFollowShop} product={product} />
//         </div>

//         {/* </section> */}
//       </div>
//       <div className="lg:block hidden">
//         <div className="flex items-center  gap-2 mt-2">
//           {images?.map((image, index) => (
//             <ProductCard
//               key={index}
//               currentImage={currentImage}
//               handleCurrentImage={handleCurrentImage}
//               image={image}
//             />
//           ))}
//         </div>
//       </div>
//       <CheckoutModal
//         // handleCreateOrder={handleCreateOrder}
//         isOpen={isCheckoutModalOpen}
//         // isSuccess={isSuccess}
//         onOpenChange={onCheckoutModalChange}
//         isForBuy={true}
//       />
//     </div>
//   );
// };

// export default ProductDetailsCard;

import React from "react";
import Rate from "rc-rate";
import { IoHeartOutline } from "react-icons/io5";
import { LuGitCompareArrows } from "react-icons/lu";
import { LiaShippingFastSolid } from "react-icons/lia";
import { LuCalendarDays } from "react-icons/lu";
import { HiMiniPlus, HiMiniMinus } from "react-icons/hi2";

import "rc-rate/assets/index.css";
import AminitiesCard from "./AminitiesCard";
import { IProduct } from "@/types";

const ProductDetailsCard = ({ product }: { product: IProduct }) => {
  const { id, name, images, price, category, shop } = product;
  console.log("from details", product);
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-4">
      {/*  image section */}
      <div>
        <img className="h-[500px]" src={images[0]} alt="" />
      </div>
      {/* text section */}
      <div>
        {/* title and review */}
        <div>
          <p className="font-semibold lg:text-[32px] text-[24px] lg:mb-0">
            {name}
          </p>
          <div className="flex justify-between items-center lg:border-b-1 lg:pb-0 ">
            <div className="flex items-center ">
              <Rate
                style={{ color: "#E21B70" }}
                allowHalf={false}
                className=""
                count={5}
                value={5}
              />
              <p className="lg:ml-1 text-[#475569] lg:text-[13px]">3</p>
            </div>
            <div>
              <button className="lg:font-medium font-semibold  text-[12px] lg:text-sm text-green-600">
                In Stock
              </button>
            </div>
          </div>
        </div>
        {/* price section */}
        <div className="lg:pt-3 lg:pb-1 pt-2 lg:border-b-0 border-b-2">
          <h2 className="text-[24px] font-bold text-primary">৳ {price}</h2>
        </div>
        {/* add to cart section */}
        <div className="flex items-center gap-3 lg:gap-2 lg:pt-0 pt-5">
          <div className="border-1 border-black inline-flex rounded-lg  gap-4 lg:px-2 lg:py-2 px-1 py-1">
            <span className="text-lg pl-1 flex items-center">
              <HiMiniMinus />
            </span>
            <span className="text-lg">1</span>
            <span className="text-lg flex items-center pr-1">
              <HiMiniPlus />
            </span>
          </div>
          <div className="w-full">
            <button className="w-full lg:py-3 py-2 rounded-lg text-sm bg-primary text-white">
              Add to cart
            </button>
          </div>
        </div>

        {/* category section */}
        <div className="lg:py-5 py-4">
          <p className="font-medium pb-1 lg:text-sm text-[13px] ">Category</p>
          <div className="inline-flex items-center border-1 gap-2 py-2 px-2">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6Z"
                />
              </svg>
            </button>
            <span className="lg:font-medium text-[12px] lg:text-[13px] font-semibold">
              {category.name}
            </span>
          </div>
        </div>
        {/* add to wishlist , compare section */}
        <div className="flex items-center gap-4 lg:gap-3">
          <div className="flex gap-2 items-center">
            <IoHeartOutline />
            <span className="text-sm text-[13px] font-semibold">
              Add to wishlist
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <LuGitCompareArrows />
            <span className="text-sm font-semibold">Compare</span>
          </div>
        </div>

        {/* store section */}
        <div className="flex items-center lg:mt-6 gap-3 my-5">
          <img src={shop.logo} className="size-14 rounded-full" alt="" />
          <div>
            <p className="text-[13px] text-[#64748B]">Store:</p>
            <p className="font-semibold">{shop.name}</p>
          </div>
        </div>
        {/* aminities section */}
      </div>
    </div>
  );
};

export default ProductDetailsCard;
