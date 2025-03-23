import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartQuantity: builder.query({
      query: () => ({
        url: "/cart/user-cart",
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    createCart: builder.mutation({
      query: (cartInfo) => {
        return {
          url: "/cart",
          method: "POST",
          body: cartInfo,
        };
      },
      invalidatesTags: ["cart"],
    }),
    removeCart: builder.mutation({
      query: (removeCartItemData: { cartItemId: string }) => {
        return {
          url: `/cart/remove-cart`,
          method: "POST",
          body: removeCartItemData,
        };
      },
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetCartQuantityQuery,
  useCreateCartMutation,
  useRemoveCartMutation,
} = cartApi;
