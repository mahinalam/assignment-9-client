import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderInfo) => {
        console.log("order info from api", orderInfo);

        return {
          url: "/order",
          method: "POST",
          body: orderInfo,
        };
      },
      invalidatesTags: ["order"],
    }),
    applyCouponCode: builder.mutation({
      query: (couponCode) => {
        return {
          url: "/coupon/code",
          method: "POST",
          body: couponCode,
        };
      },
    }),
    getVendorOrderHistory: builder.query({
      query: (vendorId: string) => {
        return {
          url: `/order/${vendorId}`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    getUsersOrderHistory: builder.query({
      query: () => {
        return {
          url: `/order/user-order-history`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),

    getUsersUnconfirmOrder: builder.query({
      query: () => {
        return {
          url: `/order/unconfirm-order`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    updateOrderStatus: builder.mutation({
      query: (payload: { transactionId: string; totalPrice: number }) => {
        return {
          url: `/order/update-order`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetVendorOrderHistoryQuery,
  useGetUsersOrderHistoryQuery,
  useApplyCouponCodeMutation,
  useGetUsersUnconfirmOrderQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
