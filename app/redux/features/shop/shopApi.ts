import { TQueryParam } from "@/types";
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
      invalidatesTags: ["shop"],
    }),
    updateShop: builder.mutation({
      query: (formData: FormData) => ({
        url: "/shop",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["shop"],
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
} = shopApi;
