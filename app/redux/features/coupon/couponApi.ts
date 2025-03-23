import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupons: builder.query({
      query: () => ({
        url: "/coupon",
        method: "GET",
      }),
    }),
    createCoupon: builder.mutation({
      query: (couponData) => {
        return {
          url: "/coupon",
          method: "POST",
          body: couponData,
        };
      },
    }),
  }),
});

export const { useCreateCouponMutation, useGetAllCouponsQuery } = couponApi;
