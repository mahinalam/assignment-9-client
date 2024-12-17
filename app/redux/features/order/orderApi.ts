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
    }),
    getVendorOrderHistory: builder.query({
      query: (vendorId: string) => {
        return {
          url: `/order/${vendorId}`,
          method: "GET",
        };
      },
    }),
    getUsersOrderHistory: builder.query({
      query: (userId: string) => {
        return {
          url: `/order/order-history/${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetVendorOrderHistoryQuery,
  useGetUsersOrderHistoryQuery,
} = orderApi;
