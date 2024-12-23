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
    followShop: builder.mutation({
      query: (payload: { followerId: string; shopId: string }) => ({
        url: "/following-shop",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateShopMutation, useFollowShopMutation } = shopApi;
