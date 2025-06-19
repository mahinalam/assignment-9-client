import { baseApi } from "../../api/baseApi";

import { TQueryParam } from "@/types";

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
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/shop",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["shop", "product"],
    }),
    getVendorShop: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/shop/vendor-shop",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["product", "shop"],
    }),
    followShop: builder.mutation({
      query: (payload: { shopId: string }) => ({
        url: "/shop/follow-shop",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["following_shop"],
    }),
    unFollowShop: builder.mutation({
      query: (shopId: string) => {
        return {
          url: `/shop/user/unfollow-shop/${shopId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["following_shop"],
    }),

    getUsersFollowingShops: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/shop/following-shop",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["following_shop"],
    }),
    updateShop: builder.mutation({
      query: (formData: FormData) => ({
        url: "/shop",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["shop"],
    }),
    checkIsFollowing: builder.query({
      query: (shopId: string) => ({
        url: `/shop/isFollowing/${shopId}`,
        method: "GET",
      }),
      providesTags: ["following_shop"],
    }),
    blockShop: builder.mutation({
      query: (shopId: string) => ({
        url: `/shop/${shopId}`,
        method: "DELETE",
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
  useBlockShopMutation,
  useUpdateShopMutation,
  useGetUsersFollowingShopsQuery,
  useUnFollowShopMutation,
  useCheckIsFollowingQuery,
} = shopApi;
