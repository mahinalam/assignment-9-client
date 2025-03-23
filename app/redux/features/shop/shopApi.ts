import { baseApi } from "../../api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShop: builder.mutation({
      query: (formData: FormData) => ({
        url: "/shop",
        method: "POST",
        body: formData,
      }),
    }),
    getAllShops: builder.query({
      query: () => ({
        url: "/shop",
        method: "GET",
      }),
    }),
    getVendorShop: builder.query({
      query: () => ({
        url: "/shop",
        method: "GET",
      }),
    }),
    followShop: builder.mutation({
      query: (payload: { shopId: string }) => ({
        url: "/shop/follow-shop",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useCreateShopMutation,
  useFollowShopMutation,
  useGetAllShopsQuery,
} = shopApi;
