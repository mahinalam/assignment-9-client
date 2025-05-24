// "use client";

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Rate from "rc-rate";
// import Link from "next/link";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// import ProductDetailsCard from "@/app/components/ProductDetails/ProductDetailsCard";
// import ReviewCart from "@/app/components/ProductDetails/ReviewCart";
// import { IProduct, IReview, TQueryParam } from "@/types";
// import ProductCart from "@/app/components/sharred/ProductCard";
// import {
//   useGetAllProductsQuery,
//   useGetSingleProductQuery,
// } from "@/app/redux/features/product/productApi";
// import { useGetProductReviewsQuery } from "@/app/redux/features/review/reviewApi";
// import { RootState } from "@/app/redux/store";
// import Loader from "@/app/components/sharred/Loader";
// import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
// import { useCreateOrderMutation } from "@/app/redux/features/order/orderApi";
// import { useFollowShopMutation } from "@/app/redux/features/shop/shopApi";

// // import AvgRating from "@/app/components/ProductDetails/ReviewProgress";
// import Container from "@/app/components/sharred/Container";
// import ReviewProgress from "@/app/components/ProductDetails/ReviewProgress";
// import {
//   useCreateCartMutation,
//   useGetCartQuantityQuery,
// } from "@/app/redux/features/cart/cartApi";
// import CheckoutModal from "@/app/components/modal/CheckoutModal";
// import StoreCard from "@/app/components/ProductDetails/StoreCard";
// import ReviewCartForSmallScreen from "@/app/components/ProductDetails/ReviewCartForSmallScreen";
// import { useDisclosure } from "@nextui-org/react";
// import ReviewModal from "@/app/components/modal/ReviewModal";

// const ProductIdPage = ({ params }: { params: { productId: string } }) => {
//   const [reviewParams, setReviewParams] = useState<TQueryParam[]>([
//     { name: "productId", value: params.productId },
//   ]);
//   const [quantity, setQuantity] = useState<number>(1);
//   const [currentImage, setCurrentImage] = useState("");
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const { data: productData, isLoading: productLoading } =
//     useGetSingleProductQuery(params?.productId);
//   const { data: productsData, isLoading } = useGetAllProductsQuery(null);
//   const { data: reviewsData, isLoading: reviewDataLoading } =
//     useGetProductReviewsQuery(reviewParams);

//   console.log("products data", productData);
//   const [followShop] = useFollowShopMutation();

//   const { data: cart, isLoading: cartDataLoading } =
//     useGetCartQuantityQuery(null);
//   console.log("review data", reviewsData);

//   const userId = useSelector((state: RootState) => state.auth.user?.userId);

//   const { data: currentUserInfo, isLoading: currentUserInfoLoading } =
//     useGetSingleUserQuery(userId);

//   console.log("currentuser info", currentUserInfo);

//   const [createOrder] = useCreateOrderMutation();
//   const [createCart] = useCreateCartMutation();
//   const currentUser = useSelector((state: RootState) => state.auth.user?.email);
//   const [defaultStarValue, setDefaultStarValue] = useState({
//     label: "All stars",
//     value: "all",
//   });

//   const [isStarValueVisible, setIsStarValueVisible] = useState(false);

//   const [isViewMoreClick, setIsViewMoreClick] = useState(false);

//   // modal for review for small screens
//   const {
//     isOpen: isReviewModalOpen,
//     onOpen: onReviewModalOpen,
//     onOpenChange: onReviewModalOpenChange,
//   } = useDisclosure();

//   // const cart = useSelector;

//   // console.log("hasVendorConflict", hasVendorConflict);
//   if (productLoading || reviewDataLoading) {
//     return <Loader />;
//   }

//   console.log("productData", productData);
//   // console.log("current user", currentUserInfo?.data);

//   const handleAddToCart = async () => {
//     if (!userId) {
//       return router.push("/login");
//     }

//     let cartInfo = {
//       productId: productData?.data?.id,
//       shopId: productData?.data?.shopId,
//       quantity,
//       price: productData?.data?.price,
//     };
//     console.log({ cartInfo });
//     try {
//       const res = await createCart(cartInfo).unwrap();

//       if (res?.success) {
//         toast.success("Product added to cart.");
//       }
//       console.log("res from cart", res);
//     } catch (error: any) {
//       toast.error(error.data.message);
//     }
//   };

//   const handleBuyProduct = async () => {
//     if (!currentUserInfo?.data?.address) {
//     }
//     // const orderPayload = {
//     //   userId: currentUserInfo?.data?.id,
//     //   shippingAddress: currentUserInfo?.data?.address,
//     //   orderItems: [
//     //     {
//     //       productId: productData?.data?.id,
//     //       quantity: 1,
//     //       price: productData?.data?.newPrice,
//     //     },
//     //   ],
//     // };

//     // console.log("orderPayload", orderPayload);
//     // try {
//     //   const orderResponse: any = await createOrder(orderPayload).unwrap();

//     //   console.log({ orderResponse });
//     //   if (orderResponse.success) {
//     //     window.location.href = orderResponse?.data?.payment_url;
//     //   }
//     // } catch (err: any) {
//     //   throw new Error(err.message);
//     // }
//   };

//   // console.log("review data", re);

//   // handle star rating
//   const handleProductStarReview = (star: any) => {
//     setDefaultStarValue({
//       label: star.label,
//       value: star.value,
//     });
//     // const updatedArr = reviewParams.map((obj) =>
//     //   obj.name === "rating" ? { ...obj, value: star.value } : obj
//     // );
//     // // setRev.push({ name: "rating", value: star.value });
//     // setReviewParams(updatedArr);
//     const updatedQueryParams = reviewParams.filter(
//       (param) => param.name !== "rating"
//     );

//     updatedQueryParams.push({
//       name: "rating",
//       value: star.value === "all" ? "" : Number(star.value),
//     });
//     setReviewParams(updatedQueryParams);
//     // reviewParams.push({ name: "rating", value: star.value });
//   };

//   const handleFollowShop = async () => {
//     const followShopData = {
//       shopId: productData?.data?.shop?.id,
//       followerId: userId!,
//     };

//     console.log("followShopData", followShopData);
//     // follow shop
//     try {
//       const res = await followShop(followShopData);

//       if (res?.data?.success) {
//         // setIsFollower(true);
//         toast.success(res?.data?.message);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // handle Image change of product details

//   const starsInfo = [
//     { value: "all", label: "All stars" },
//     { value: "5", label: "5 star" },
//     { value: "4", label: "4 star" },
//     { value: "3", label: "3 star" },
//     { value: "2", label: "2 star" },
//     { value: "1", label: "1 star" },
//   ];
//   console.log("review", reviewsData?.data?.data);

//   return (
//     <Container>
//       <div className="">
//         {/* <Container> */}
//         <div className="bg-white">
//           <div className="md:mt-[170px] px-3 sm:px-0 mt-10 md:p-5  md:pl-3">
//             <ProductDetailsCard
//               handleAddToCart={handleAddToCart}
//               handleBuyProduct={handleBuyProduct}
//               handleFollowShop={handleFollowShop}
//               product={productData?.data}
//               quantity={quantity}
//               setQuantity={setQuantity}
//             />
//           </div>
//         </div>
//         {/* </Container> */}
//         {/* product details description section */}
//         {/* <Container> */}
//         <div className="lg:block hidden lg:w-[85%] mt-4  md:p-5 md:pr-0 bg-white">
//           <div className="">
//             <section>
//               <p className="font-semibold  text-medium  bg-[#FAFAFA] mb-0 py-2  ">
//                 {`Product details of ${productData?.data?.name}`}
//               </p>
//             </section>
//             <section>
//               <p className="mb-4">{productData?.data?.description}</p>
//               {!isViewMoreClick && (
//                 <div className=" w-full flex flex-col justify-center md:py-2 items-center overflow-hidden">
//                   <img
//                     alt=""
//                     className="h-[600px] w-auto object-cover "
//                     src={productData?.data?.images[0]}
//                   />
//                 </div>
//               )}
//               {isViewMoreClick && (
//                 <div
//                   id="viewMore"
//                   className=" w-full flex flex-col justify-center md:py-2 items-center overflow-hidden"
//                 >
//                   {productData?.data?.images.map((image: any) => (
//                     <img
//                       alt=""
//                       className="h-[600px] w-auto object-cover "
//                       src={image}
//                     />
//                   ))}
//                 </div>
//               )}

//               {/* view more button section */}
//               <div className="text-center">
//                 {!isViewMoreClick ? (
//                   <button
//                     onClick={() => setIsViewMoreClick(true)}
//                     className="py-2 px-6 text-[#136CFF] transition-all duration-300 ease-in-out hover:text-white border-[1px] hover:bg-[#136CFF] border-[#136CFF] hover:border-[#136CFF] text-sm"
//                   >
//                     VIEW MORE
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => setIsViewMoreClick(false)}
//                     className="py-2 px-6 text-[#136CFF] transition-all duration-300 ease-in-out hover:text-white border-[1px] hover:bg-[#136CFF] border-[#136CFF] hover:border-[#136CFF] text-sm"
//                   >
//                     VIEW LESS
//                   </button>
//                 )}
//               </div>
//             </section>
//             <section />
//           </div>
//         </div>
//         <div>
//           {/* delivery & service for small devices */}
//           <section className="lg:hidden block px-3 sm:px-0 bg-white mt-3">
//             {/* delivery section */}
//             <div className="flex  border-b-[1px] border-b-[#D5D5D5]  py-[14px]">
//               <div>
//                 <p className="text-sm text-secondary ">Delivery</p>
//               </div>
//               <div className="flex gap-4 pl-5 justify-between">
//                 <p className="text-xs text-title">
//                   Standard Delivery <br /> Guaranteed within 3-7 days
//                 </p>
//               </div>
//               <p className="text-xs text-title ml-auto">
//                 <span className="text-[10px]">৳</span>
//                 <span className="font-bold"> 50</span>
//               </p>
//             </div>

//             {/* service section */}
//             <div className="flex py-[14px]">
//               <div>
//                 <p className="text-sm text-secondary">Service</p>
//               </div>
//               <div className="text-xs pl-5">
//                 <li className="list-item !mr-0 text-title">
//                   Fast & Secure Delivery
//                 </li>
//                 <li className="list-item !mr-0 text-title">
//                   Fast & Secure Delivery
//                 </li>
//               </div>
//             </div>
//           </section>
//           {/* <Container> */}
//           {/* review for large screen  */}
//           <div className="bg-white lg:w-[85%] lg:block hidden">
//             <div className="sm:px-0 px-3">
//               <div className="py-2 md:border-y-1 md:p-5 flex items-center justify-between">
//                 <p className=" md:text-base text-[14px] text-[#757575] md:text-black ">
//                   Product Reviews{" "}
//                   {reviewsData?.data?.data?.length <= 0 && "(0)"}
//                 </p>
//                 {reviewsData?.data?.data?.length > 0 && (
//                   <div
//                     onClick={() => setIsStarValueVisible(!isStarValueVisible)}
//                     className="flex "
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="size-5"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
//                       />
//                     </svg>
//                     <span className="ml-1">Filter:</span>
//                     <button>{defaultStarValue.label}</button>
//                     <div className="relative">
//                       {" "}
//                       {isStarValueVisible && (
//                         <div className="absolute right-1 top-7 z-10 w-40 bg-white rounded-lg shadow-lg border">
//                           <ul className="py-2">
//                             {starsInfo.map((star: any, index: any) => (
//                               <li
//                                 onClick={() =>
//                                   // setDefaultStarValue({
//                                   //   label: star.label,
//                                   //   value: star.value,
//                                   // })
//                                   handleProductStarReview(star)
//                                 }
//                                 key={index}
//                                 className="px-4 py-2 text-sm text-left text-gray-700  cursor-pointer hover:bg-gray-100"
//                               >
//                                 <button>{star.label}</button>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="md:p-5">
//                 {" "}
//                 {reviewsData?.data?.data?.length > 0 &&
//                   reviewsData.data.data.map((review: IReview) => (
//                     <ReviewCart key={review.id} item={review} />
//                   ))}
//               </div>
//             </div>
//           </div>
//           {/*
//          review for small screen */}
//           <div className="bg-white md:hidden block sm:px-0 px-3 ">
//             <div className=" mt-3 flex items-center justify-between py-3">
//               <p className="text-sm text-secondary ">
//                 Ratings and Reviews ({productData?.data?.review.length})
//               </p>
//               {productData?.data?.review.length > 0 && (
//                 <span
//                   onClick={() => onReviewModalOpen()}
//                   className="italic text-xs text-primary"
//                 >
//                   View All
//                 </span>
//               )}
//             </div>
//             {productData?.data?.review?.map((review: any) => (
//               <ReviewCartForSmallScreen reviewData={review} />
//             ))}
//           </div>
//           {/* </Container> */}
//           <div>
//             <div className="lg:my-5 my-3 lg:bg-inherit bg-white">
//               <div className="px-3 sm:px-0">
//                 <p className="lg:text-left lg:p-0 p-2  text-center lg:mb-4 lgd:font-bold font-normal">
//                   You may also like
//                 </p>
//                 <div className="grid md:grid-cols-4 grid-cols-3 gap-1  md:gap-4 md:w-[70%] w-full md:pb-0 pb-4">
//                   {productsData?.data?.data
//                     ?.slice(0, 4)
//                     .map((product: IProduct) => (
//                       <Link
//                         key={product.id}
//                         href={`/products/${productData?.data?.id}`}
//                       >
//                         {" "}
//                         <ProductCart product={product} />
//                       </Link>
//                     ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* store details section */}
//           <div className="w-full md:hidden block bg-white sm:px-0 px-3 md:pb-0 pb-1">
//             {/* <Container> */}
//             <StoreCard
//               handleFollowShop={handleFollowShop}
//               product={productData?.data}
//             />
//             {/* </Container> */}
//           </div>

//           {/* description for small screen */}
//           <Container>
//             <section className="lg:hidden block px-3 sm:px-0">
//               <div className="">
//                 {/* TODO: fixed multiple lines */}
//                 <p className="text-sm text-subTitle  border-b-[1px] pb-1 border-b-[#D5D5D5] my-5">
//                   Description
//                 </p>
//                 <p className="text-xs">{productData?.data?.description}</p>
//               </div>
//               <div>
//                 <img className="w-full" src={productData?.data?.images?.[0]} />
//               </div>
//             </section>
//           </Container>
//         </div>
//       </div>

//       <ReviewModal
//         reviewsData={reviewsData}
//         isOpen={isReviewModalOpen}
//         onOpenChange={onReviewModalOpenChange}
//         reviews={productData?.data?.review}
//       />
//     </Container>
//   );
// };

// export default ProductIdPage;

// // import { Button } from "@nextui-org/button";

// // import CartPage from "./components/CartPage";

// //   const handleCreateOrder = async (data: any) => {
// //     console.log("order data", data);

// //     const orderPayload = {
// //       ...data,
// //       shopId: cart?.data?.shopId,
// //       orderItems: cart?.data?.cartItems?.map((item: any) => ({
// //         productId: item.productId,
// //         quantity: item.quantity,
// //         price: item.price,
// //       })),
// //     };

// //     console.log("orderpayload", orderPayload);

// //     try {
// //       const orderResponse: any = await createOrder(orderPayload).unwrap();

// //       if (orderResponse?.success) {
// //         router.push("/checkout");
// //         onClose();
// //       }
// //     } catch (err) {}
// //   };

// //   console.log({ isSuccess });

// //   return (
// //     <Container>
// //       <div className=" flex gap-4 min-h-[60vh] lg:mt-[160px] md:mt-[96px] mt-[62px]">

// //         <CheckoutModal
// //           handleCreateOrder={handleCreateOrder}
// //           isOpen={isCheckoutModalOpen}
// //           isSuccess={isSuccess}
// //           onOpenChange={onCheckoutModalChange}
// //         />
// //       </div>
// //     </Container>
// //   );
// // };

// // export default AllCart;
"use client";
import ProductDetailsCard from "@/app/components/ProductDetails/ProductDetailsCard";
import Container from "@/app/components/sharred/Container";
import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "@/app/redux/features/product/productApi";
import React, { useState } from "react";
import Description from "./Description";
import Link from "next/link";
import FlashSaleCard from "@/app/components/sharred/FlashSaleCard";
import { useGetProductReviewsQuery } from "@/app/redux/features/review/reviewApi";
import { TQueryParam } from "@/types";
import Reviews from "./Reviews";

const page = ({ params }: { params: { productId: string } }) => {
  const { data: productsData, isLoading } = useGetAllProductsQuery(null);
  const { data: productData, isLoading: productLoading } =
    useGetSingleProductQuery(params?.productId);
  const [activeTab, setActiveTan] = useState("description");

  const [reviewParams, setReviewParams] = useState<TQueryParam[]>([
    { name: "productId", value: params.productId },
  ]);

  const { data: reviewsData, isLoading: reviewDataLoading } =
    useGetProductReviewsQuery(reviewParams);

  console.log("reviews data", reviewsData);

  if (productLoading || reviewDataLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Container>
      <div className="bg-white">
        <div className="md:mt-[170px]  mt-10 md:p-5  md:pl-3">
          <ProductDetailsCard product={productData?.data} />
        </div>

        {/* descripotion */}
        <div className="flex gap-4">
          <p
            className={`${
              activeTab === "description"
                ? "font-bold   border-b-black pb-2  border-b-2"
                : "text-[#94A3B8] font-medium"
            } text-[18px] cursor-pointer`}
            onClick={() => setActiveTan("description")}
          >
            Description
          </p>
          <p
            className={`${
              activeTab === "reviews"
                ? "font-bold border-b-2 border-b-black pb-2"
                : "text-[#94A3B8] font-medium"
            } text-[18px] cursor-pointer`}
            onClick={() => setActiveTan("reviews")}
          >
            Reviews
          </p>
        </div>
        {activeTab === "description" && (
          <Description productData={productData} />
        )}
        {activeTab === "reviews" && (
          <Reviews reviewsData={reviewsData?.data?.data?.result} />
        )}

        {/* related products */}
        <div>
          <p>Related Products</p>
          <div className="grid  sm:grid-cols-4 lg:grid-cols-4 grid-cols-2 xl:grid-cols-5 mt-2 gap-4">
            {productsData?.data?.data?.map((flashSaleProduct: any) => (
              <Link
                href={`/products/${flashSaleProduct.id}`}
                key={flashSaleProduct.id}
              >
                <FlashSaleCard product={flashSaleProduct} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default page;
