// // // import Image from "next/image";
// // // import React from "react";
// // // import "rc-rate/assets/index.css";
// // // import Rate from "rc-rate";
// // // import "rc-rate/assets/index.css";
// // // import { useGetProductReviewsQuery } from "@/app/redux/features/review/reviewApi";
// // // import { calculateDiscountPercentage } from ".";

// // // const FlashSaleCard = ({ product }: any) => {
// // //   const { id, images, name, discount, price, review } = product;
// // //   const { data: reviewData } = useGetProductReviewsQuery(id);

// // //   const { discountPercentage, discountPrice } = calculateDiscountPercentage(
// // //     Number(price),
// // //     Number(discount)
// // //   );
// // //   console.log({ discountPercentage, discountPrice });
// // //   return (
// // //     <div className="p-2 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ">
// // //       <div className="">
// // //         <Image alt="" height={200} src={images[0]} width={300} />
// // //       </div>
// // //       <div className="md:hidden block mt-1 ">
// // //         <div className="bg-primary bg-opacity-10 flex items-center justify-between text-xs p-0.5 rounded-lg">
// // //           <p className="text-primary font-bold">৳{discountPrice}</p>
// // //           <p className="bg-primary text-white p-1  rounded-lg">
// // //             {/* discount price */}
// // //             {discountPercentage}%
// // //           </p>
// // //         </div>
// // //       </div>
// // //       <div className="mx-2 mt-1 mb-0 leading-none hidden md:block">
// // //         <div className="font-medium text-sm font-sans mb-1 md:text-base ">
// // //           {name}
// // //         </div>
// // //         <div className="text-primary  md:text-lg text-base mb-1">
// // //           <span>৳</span>
// // //           <span className="font-semibold">{discountPrice}</span>
// // //         </div>
// // //         <div className="flex">
// // //           <div className="text-sm text-secondary flex line-through">
// // //             {/* original price */}
// // //             <span>
// // //               <span>৳</span>
// // //               {price}
// // //             </span>
// // //           </div>
// // //           <div className="md:text-[12px] text-[10px] ml-1 flex items-center">
// // //             <span>-</span>
// // //             <span>
// // //               {/* // percentage */}
// // //               {discountPercentage}%
// // //             </span>
// // //           </div>
// // //         </div>

// // //         {/* rating for small screen */}
// // //         <div>
// // //           <Rate
// // //             allowHalf={false}
// // //             className="text-[#FACA51] "
// // //             count={5}
// // //             value={reviewData?.data?.averageRating}
// // //           />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default FlashSaleCard;

// // import Image from "next/image";
// // import React, { useState } from "react";
// // import "rc-rate/assets/index.css";
// // import Rate from "rc-rate";
// // import "rc-rate/assets/index.css";
// // import { useGetProductReviewsQuery } from "@/app/redux/features/review/reviewApi";
// // import { calculateDiscountPercentage } from ".";
// // import { Rating } from "react-simple-star-rating";

// // const FlashSaleCard = ({ product }: any) => {
// //   const { id, images, name, discount, price, review } = product;
// //   const { data: reviewData } = useGetProductReviewsQuery(id);
// //   const [isaddToCartOpen, setIsAddToCartOpen] = useState(false);

// //   const { discountPercentage, discountPrice } = calculateDiscountPercentage(
// //     Number(price),
// //     Number(discount)
// //   );
// //   console.log({ discountPercentage, discountPrice });
// //   return (
// //     <div
// //       onMouseEnter={() => setIsAddToCartOpen(true)}
// //       onMouseLeave={() => setIsAddToCartOpen(false)}
// //       className="p-2 bg-white rounded-lg shadow-md  hover:shadow-xl transition-shadow duration-300 "
// //     >
// //       <div className="">
// //         <Image alt="" height={300} src={images[0]} width={300} />
// //       </div>
// //       <div className="md:hidden block mt-1 ">
// //         <div className="bg-primary bg-opacity-10 flex items-center justify-between text-xs p-0.5 rounded-lg">
// //           <p className="text-primary font-bold">৳{discountPrice}</p>
// //           <p className="bg-primary text-white p-1  rounded-lg">
// //             {/* discount price */}
// //             {discountPercentage}%
// //           </p>
// //         </div>
// //       </div>
// //       <div className="mx-2 mt-1 mb-0 leading-none hidden md:block">
// //         {/* rating for small screen */}
// //         <div>
// //           {/* <Rate
// //             allowHalf={false}
// //             className="text-[#FACA51]  "
// //             count={5}
// //             disabled
// //             value={reviewData?.data?.averageRating}
// //           /> */}
// //           <Rating
// //             readonly
// //             size={15}
// //             fillColor="#FACA51"
// //             emptyColor="#E5E7EB"
// //             initialValue={5}
// //             allowFraction
// //             SVGstyle={{ display: "inline" }}
// //           />
// //         </div>
// //         <div className="font-semibold  text-lg font-sans mb-1 md:text-base  mt-2">
// //           {name}

// //           <div className="flex gap-2 mt-2">
// //             <p className="text-primary ">৳200</p>
// //             <p className="line-through text-gray-400  ">৳200</p>
// //           </div>

// //           {/* // add to compare , view etc */}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FlashSaleCard;

// import Image from "next/image";
// import React, { useState } from "react";
// import "rc-rate/assets/index.css";
// import { useGetProductReviewsQuery } from "@/app/redux/features/review/reviewApi";
// import { calculateDiscountPercentage } from ".";
// import { Rating } from "react-simple-star-rating";

// const FlashSaleCard = ({ product }: any) => {
//   const { id, images, name, discount, price } = product;
//   const { data: reviewData } = useGetProductReviewsQuery(id);
//   const [isHovered, setIsHovered] = useState(false);

//   const { discountPercentage, discountPrice } = calculateDiscountPercentage(
//     Number(price),
//     Number(discount)
//   );

//   return (
//     <div
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="relative p-2 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
//     >
//       {/* Product Image */}
//       <div className="w-full">
//         <Image
//           alt={name}
//           height={300}
//           width={300}
//           src={images[0]}
//           className="w-full rounded"
//         />
//       </div>

//       {/* Mobile View Discount */}
//       <div className="md:hidden block mt-1">
//         <div className="bg-primary bg-opacity-10 flex items-center justify-between text-xs p-0.5 rounded-lg">
//           <p className="text-primary font-bold">৳{discountPrice}</p>
//           <p className="bg-primary text-white p-1 rounded-lg">
//             {discountPercentage}%
//           </p>
//         </div>
//       </div>

//       {/* Product Info (Desktop) */}
//       <div className="mx-2 mt-1 hidden md:block">
//         <div className="mb-1">
//           <Rating
//             readonly
//             size={15}
//             fillColor="#FACA51"
//             emptyColor="#E5E7EB"
//             initialValue={reviewData?.data?.averageRating || 0}
//             allowFraction
//             SVGstyle={{ display: "inline" }}
//           />
//         </div>

//         <div className="font-semibold text-base font-sans mb-1 line-clamp-2 h-[40px]">
//           {name}
//         </div>

//         <div className="flex gap-2 mt-2">
//           <p className="text-primary font-bold">৳{discountPrice}</p>
//           <p className="line-through text-gray-400">৳{price}</p>
//         </div>
//       </div>

//       {/* Floating Action Buttons */}
//       <div
//         className={`absolute right-2 top-2 space-x-2 transition-all duration-300 ${
//           isHovered
//             ? "opacity-100 translate-y-0"
//             : "opacity-0 translate-y-4 pointer-events-none"
//         } flex`}
//       >
//         <button className="bg-white border border-gray-300 text-xs px-3 py-1 rounded hover:bg-black hover:text-white transition">
//           Add to Cart
//         </button>
//         <button className="bg-white border border-gray-300 text-xs px-2 py-1 rounded hover:bg-black hover:text-white transition">
//           View
//         </button>
//         <button className="bg-white border border-gray-300 text-xs px-2 py-1 rounded hover:bg-black hover:text-white transition">
//           Compare
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FlashSaleCard;

import Image from "next/image";
import React, { useState } from "react";
import { useGetProductReviewsQuery } from "@/app/redux/features/review/reviewApi";
import { calculateDiscountPercentage } from ".";
import { Rating } from "react-simple-star-rating";
import { IoMdHeartEmpty } from "react-icons/io";
import { LuGitCompare } from "react-icons/lu";

const FlashSaleCard = ({ product }: any) => {
  const { id, images, name, discount, price } = product;
  const { data: reviewData } = useGetProductReviewsQuery(id);
  const [isHovered, setIsHovered] = useState(false);

  const { discountPercentage, discountPrice } = calculateDiscountPercentage(
    Number(price),
    Number(discount)
  );

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-2 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      {/* Floating Buttons Top-Right */}
      <div
        className={`absolute top-2 right-2 flex flex-col gap-2 transition-all duration-300 ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-5 pointer-events-none"
        }`}
      >
        {/* <button className="bg-white shadow px-2 py-1 text-xs rounded hover:bg-black hover:text-white transition">
          Add to Cart
        </button> */}

        {/* <button className="bg-white shadow px-2 py-1 text-xs rounded hover:bg-black hover:text-white transition">
          View
        </button> */}
        {/* <button className="bg-white shadow px-2 py-1 text-xs rounded hover:bg-black hover:text-white transition">
          Compare
        </button> */}

        <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
          {/* Favorite Button */}
          <div className="relative group">
            <button className="p-2 bg-white shadow rounded-full  hover:bg-primary hover:text-white transition">
              <IoMdHeartEmpty size={20} />
            </button>
            <span className="absolute top-1/2 right-full mr-2 -translate-y-1/2 px-2 py-1 text-xs text-white bg-gray-500  rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">
              Add to Wishlist
            </span>
          </div>

          {/* Compare Button */}
          <div className="relative group">
            <button className="p-2 bg-white shadow rounded-full  hover:bg-primary hover:text-white transition">
              <LuGitCompare size={20} />
            </button>
            <span className="absolute top-1/2 right-full mr-2  -translate-y-1/2 px-2 py-1 text-xs text-white bg-gray-500 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">
              Add to Compare
            </span>
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className="w-full">
        <Image
          alt={name}
          height={300}
          width={300}
          src={images[0]}
          className="w-full rounded"
        />
      </div>

      {/* Mobile Price Info */}
      {/* <div className="md:hidden block mt-1">
        <div className="bg-primary bg-opacity-10 flex items-center justify-between text-xs p-0.5 rounded-lg">
          <p className="text-primary font-bold">৳{discountPrice}</p>
          <p className="bg-primary text-white p-1 rounded-lg">
            {discountPercentage}%
          </p>
        </div>
      </div> */}

      {/* Desktop Info */}
      <div className="mx-2 mt-1">
        <div className="mb-1">
          <Rating
            readonly
            size={15}
            fillColor="#FACA51"
            emptyColor="#E5E7EB"
            initialValue={reviewData?.data?.averageRating || 0}
            allowFraction
            SVGstyle={{ display: "inline" }}
          />
        </div>
        <div className="font-semibold text-sm lg:text-base font-sans mb-1 line-clamp-2 ">
          {name}
        </div>
        <div className="flex gap-2 mt-3">
          <p className="text-primary font-bold">৳{discountPrice}</p>
          <p className="line-through text-gray-400">৳{price}</p>
        </div>
      </div>
      <div>
        <button className="w-full bg-primary hover:bg-[#ca1d68] py-2 rounded-lg text-sm font-semibold mt-3 mb-2 text-white">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default FlashSaleCard;
