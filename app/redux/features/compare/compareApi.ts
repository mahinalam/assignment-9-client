import { baseApi } from "../../api/baseApi";

const compareApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsersCompareProducts: builder.query({
      query: () => {
        return {
          url: "/compare",
          method: "GET",
        };
      },
      providesTags: ["compare"],
    }),
    createCompareProduct: builder.mutation({
      query: (compareInfo) => {
        return {
          url: "/compare",
          method: "POST",
          body: compareInfo,
        };
      },
      invalidatesTags: ["compare"],
    }),
    deleteCompareProduct: builder.mutation({
      query: (productId: string) => {
        return {
          url: `/compare/${productId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["compare"],
    }),
  }),
});

export const {
  useGetUsersCompareProductsQuery,
  useCreateCompareProductMutation,
  useDeleteCompareProductMutation,
} = compareApi;
