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
  }),
});

export const { useCreateShopMutation } = shopApi;
