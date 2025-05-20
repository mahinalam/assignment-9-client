import { TQueryParam } from "@/types";
import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupons: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/coupon",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["coupon"],
    }),
    createCoupon: builder.mutation({
      query: (couponData) => {
        return {
          url: "/coupon",
          method: "POST",
          body: couponData,
        };
      },
      invalidatesTags: ["coupon"],
    }),
    deleteCoupon: builder.mutation({
      query: (couponId: string) => {
        return {
          url: `/coupon/${couponId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["coupon"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetAllCouponsQuery,
  useDeleteCouponMutation,
} = couponApi;
