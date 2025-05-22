import { TQueryParam } from "@/types";
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
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/order/vendor-order-history`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["order"],
    }),
    getAllOrderHistory: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/order/order-history",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["order"],
    }),

    getUsersOrderHistory: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/order/user-order-history",
          method: "GET",
          params: params,
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
    deleteUsersOrder: builder.mutation({
      query: (orderItemId: string) => {
        return {
          url: `/order/${orderItemId}`,
          method: "DELETE",
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
  useGetAllOrderHistoryQuery,
  useDeleteUsersOrderMutation,
} = orderApi;
