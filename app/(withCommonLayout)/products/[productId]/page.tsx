"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rate from "rc-rate";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import ProductDetailsCard from "@/app/components/ProductDetails/ProductDetailsCard";
import ReviewCart from "@/app/components/ProductDetails/ReviewCart";
import { IProduct, IReview } from "@/types";
import ProductCart from "@/app/components/sharred/ProductCard";
import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "@/app/redux/features/product/productApi";
import { useGetProductReviewsQuery } from "@/app/redux/features/review/reviewApi";
import { RootState } from "@/app/redux/store";
import Loader from "@/app/components/sharred/Loader";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import { useCreateOrderMutation } from "@/app/redux/features/order/orderApi";
import { useFollowShopMutation } from "@/app/redux/features/shop/shopApi";

// import AvgRating from "@/app/components/ProductDetails/ReviewProgress";
import Container from "@/app/components/sharred/Container";
import ReviewProgress from "@/app/components/ProductDetails/ReviewProgress";
import {
  useCreateCartMutation,
  useGetCartQuantityQuery,
} from "@/app/redux/features/cart/cartApi";
import CheckoutModal from "@/app/components/modal/CheckoutModal";
import StoreCard from "@/app/components/ProductDetails/StoreCard";
import ReviewCartForSmallScreen from "@/app/components/ProductDetails/ReviewCartForSmallScreen";
import { useDisclosure } from "@nextui-org/react";
import ReviewModal from "@/app/components/modal/ReviewModal";

const ProductIdPage = ({ params }: { params: { productId: string } }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImage, setCurrentImage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: productData, isLoading: productLoading } =
    useGetSingleProductQuery(params?.productId);
  const { data: productsData, isLoading } = useGetAllProductsQuery(null);
  const { data: reviewsData, isLoading: reviewDataLoading } =
    useGetProductReviewsQuery(params.productId);

  // console.log("productData", productData?.data);
  const [followShop] = useFollowShopMutation();

  const { data: cart, isLoading: cartDataLoading } =
    useGetCartQuantityQuery(null);
  console.log("review data", reviewsData);

  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const { data: currentUserInfo, isLoading: currentUserInfoLoading } =
    useGetSingleUserQuery(userId);

  const [createOrder] = useCreateOrderMutation();
  const [createCart] = useCreateCartMutation();
  const currentUser = useSelector((state: RootState) => state.auth.user?.email);

  const [isViewMoreClick, setIsViewMoreClick] = useState(false);

  // modal for review for small screens
  const {
    isOpen: isReviewModalOpen,
    onOpen: onReviewModalOpen,
    onOpenChange: onReviewModalOpenChange,
  } = useDisclosure();

  // const cart = useSelector;

  // console.log("hasVendorConflict", hasVendorConflict);
  if (productLoading || reviewDataLoading) {
    return <Loader />;
  }

  console.log("productData", productData);
  // console.log("current user", currentUserInfo?.data);

  const handleAddToCart = async () => {
    if (!userId) {
      return router.push("/login");
    }

    let cartInfo = {
      productId: productData?.data?.id,
      shopId: productData?.data?.shopId,
      quantity,
      price: productData?.data?.newPrice,
    };

    try {
      const res = await createCart(cartInfo).unwrap();

      if (res?.success) {
        toast.success("Product added to cart.");
      }
      console.log("res from cart", res);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handleCreateOrder = async () => {
    if (!currentUserInfo?.data?.address) {
    }
    // const orderPayload = {
    //   userId: currentUserInfo?.data?.id,
    //   shippingAddress: currentUserInfo?.data?.address,
    //   orderItems: [
    //     {
    //       productId: productData?.data?.id,
    //       quantity: 1,
    //       price: productData?.data?.newPrice,
    //     },
    //   ],
    // };

    // console.log("orderPayload", orderPayload);
    // try {
    //   const orderResponse: any = await createOrder(orderPayload).unwrap();

    //   console.log({ orderResponse });
    //   if (orderResponse.success) {
    //     window.location.href = orderResponse?.data?.payment_url;
    //   }
    // } catch (err: any) {
    //   throw new Error(err.message);
    // }
  };

  const handleFollowShop = async () => {
    const followShopData = {
      shopId: productData?.data?.shop?.id,
      followerId: userId!,
    };

    console.log("followShopData", followShopData);
    // follow shop
    try {
      const res = await followShop(followShopData);

      if (res?.data?.success) {
        // setIsFollower(true);
        toast.success(res?.data?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // handle Image change of product details

  return (
    <Container>
      <div className="">
        {/* <Container> */}
        <div className="bg-white">
          <div className="md:mt-[170px] px-3 sm:px-0 mt-10 md:p-5  md:pl-3">
            <ProductDetailsCard
              handleAddToCart={handleAddToCart}
              handleCreateOrder={handleCreateOrder}
              handleFollowShop={handleFollowShop}
              product={productData?.data}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>
        </div>
        {/* </Container> */}
        {/* product details description section */}
        {/* <Container> */}
        <div className="md:block hidden md:w-[85%]  mt-5 md:p-5 md:pr-0 bg-white">
          <div className="">
            <section>
              <p className="font-semibold md:text-xl text-lg bg-[#FAFAFA] mb-0 py-2">
                {productData?.data?.name}
              </p>
            </section>
            <section>
              <p className="mb-4">{productData?.data?.description}</p>
              {!isViewMoreClick && (
                <div className=" w-full flex flex-col justify-center md:py-2 items-center overflow-hidden">
                  <img
                    alt=""
                    className="h-[600px] w-auto object-cover "
                    src={productData?.data?.images[0]}
                  />
                </div>
              )}
              {isViewMoreClick && (
                <div
                  id="viewMore"
                  className=" w-full flex flex-col justify-center md:py-2 items-center overflow-hidden"
                >
                  {productData?.data?.images.map((image: any) => (
                    <img
                      alt=""
                      className="h-[600px] w-auto object-cover "
                      src={image}
                    />
                  ))}
                </div>
              )}

              {/* view more button section */}
              <div className="text-center">
                {!isViewMoreClick ? (
                  <button
                    onClick={() => setIsViewMoreClick(true)}
                    className="py-2 px-6 text-[#136CFF] transition-all duration-300 ease-in-out hover:text-white border-[1px] hover:bg-[#136CFF] border-[#136CFF] hover:border-[#136CFF] text-sm"
                  >
                    VIEW MORE
                  </button>
                ) : (
                  <button
                    onClick={() => setIsViewMoreClick(false)}
                    className="py-2 px-6 text-[#136CFF] transition-all duration-300 ease-in-out hover:text-white border-[1px] hover:bg-[#136CFF] border-[#136CFF] hover:border-[#136CFF] text-sm"
                  >
                    VIEW LESS
                  </button>
                )}
              </div>
            </section>
            <section />
          </div>
        </div>
        {/* </Container> */}
        {/* details product reviews */}
        {/* <Container> */}
        <div className="lg:block hidden md:w-[85%] bg-white md:p-5 mt-5">
          <ReviewProgress
            productName={productData?.data?.name}
            reviewData={reviewsData?.data}
          />
        </div>
        {/* </Container> */}
        <div>
          {/* delivery & service for small devices */}
          <section className="md:hidden block px-3 sm:px-0 bg-white mt-3">
            {/* delivery section */}
            <div className="flex  border-b-[1px] border-b-[#D5D5D5]  py-[14px]">
              <div>
                <p className="text-sm text-secondary">Delivery</p>
              </div>
              <div className="flex gap-4 pl-5">
                <p className="text-xs text-title">
                  Standard Delivery <br /> Guarnteed by 20-27 March
                </p>
                <p className="text-xs text-title">
                  <span className="text-[10px]">৳</span>
                  <span className="font-bold"> 50</span>
                </p>
              </div>
            </div>

            {/* service section */}
            <div className="flex py-[14px]">
              <div>
                <p className="text-sm text-secondary">Service</p>
              </div>
              <div className="text-xs pl-5">
                <li className="list-item !mr-0 text-title">
                  Fast & Secure Delivery
                </li>
                <li className="list-item !mr-0 text-title">
                  Fast & Secure Delivery
                </li>
              </div>
            </div>
          </section>
          {/* <Container> */}
          {/* review for large screen  */}
          <div className="bg-white md:w-[85%] md:block hidden">
            <div className="sm:px-0 px-3">
              <p className="py-2 md:border-y-1 md:text-base text-[14px] text-[#757575] md:text-black md:p-5">
                Product Reviews
              </p>
              {/* {productData?.data?.review?.length === 0 && (
                <div className="md:block hidden">
                  <div className="flex items-center gap-2">
                    <div>
                      <Rate
                        allowHalf={false}
                        className="text-[#FACA51] text-xl "
                        count={5}
                        value={5}
                      />
                    </div>
                    <div className="text-gray-500 ">
                      ({productData?.data?.review.length})
                    </div>
                  </div>
                </div>
              )} */}
              <div className="md:p-5">
                {" "}
                {productData?.data?.review?.length > 0 &&
                  productData?.data?.review?.map((review: IReview) => (
                    <ReviewCart key={review.id} item={review} />
                  ))}
              </div>
            </div>
          </div>

          {/* 
         review for small screen */}
          <div className="bg-white md:hidden block">
            <div className=" mt-5 flex items-center justify-between">
              <p className="text-sm text-secondary">
                Ratings and Reviews ({productData?.data?.review.length})
              </p>
              <span
                onClick={() => onReviewModalOpen()}
                className="italic text-xs text-primary"
              >
                View All
              </span>
            </div>
            {productData?.data?.review?.map((review: any) => (
              <ReviewCartForSmallScreen reviewData={review} />
            ))}
          </div>
          {/* </Container> */}
          <div>
            <div className="md:my-5 my-3 md:bg-inherit bg-white">
              <div className="px-3 sm:px-0">
                <p className="md:text-left md:p-0 p-2  text-center md:mb-4 md:font-bold font-normal">
                  You may also like
                </p>
                <div className="grid md:grid-cols-4 grid-cols-3 gap-1  md:gap-4 md:w-[70%] w-full md:pb-0 pb-4">
                  {productsData?.data?.data
                    ?.slice(0, 4)
                    .map((product: IProduct) => (
                      <Link
                        key={product.id}
                        href={`/products/${productData?.data?.id}`}
                      >
                        {" "}
                        <ProductCart product={product} />
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* store details section */}
          <div className="w-full md:hidden block bg-white sm:px-0 px-3 md:pb-0 pb-1">
            {/* <Container> */}
            <StoreCard
              handleFollowShop={handleFollowShop}
              product={productData?.data}
            />
            {/* </Container> */}
          </div>
          <section></section>
        </div>
      </div>
      <CheckoutModal />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onOpenChange={onReviewModalOpenChange}
      />
    </Container>
  );
};

export default ProductIdPage;
