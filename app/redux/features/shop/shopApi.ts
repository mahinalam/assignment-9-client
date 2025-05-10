import { baseApi } from "../../api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShop: builder.mutation({
      query: (formData: FormData) => ({
        url: "/shop",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["shop"],
    }),
    getAllShops: builder.query({
      query: () => ({
        url: "/shop",
        method: "GET",
      }),
      providesTags: ["product", "shop"],
    }),
    getVendorShop: builder.query({
      query: () => ({
        url: "/shop/vendor-shop",
        method: "GET",
      }),
      providesTags: ["product", "shop"],
    }),
    followShop: builder.mutation({
      query: (payload: { shopId: string }) => ({
        url: "/shop/follow-shop",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["shop"],
    }),
  }),
});

export const {
  useCreateShopMutation,
  useFollowShopMutation,
  useGetAllShopsQuery,
  useGetVendorShopQuery,
} = shopApi;
