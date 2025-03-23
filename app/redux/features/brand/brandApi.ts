import { baseApi } from "../../api/baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBrand: builder.mutation({
      query: (brandInfo) => {
        console.log("order info from api", brandInfo);

        return {
          url: "/brand",
          method: "POST",
          body: brandInfo,
        };
      },
      invalidatesTags: ["brand"],
    }),
    getAllBrands: builder.query({
      query: () => {
        return {
          url: `/brand`,
          method: "GET",
        };
      },
      providesTags: ["brand"],
    }),
  }),
});

export const { useCreateBrandMutation, useGetAllBrandsQuery } = brandApi;
