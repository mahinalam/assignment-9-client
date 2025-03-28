import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getSingleCategory: builder.query({
      query: (id) => ({
        url: `/category/single-category/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    createCategory: builder.mutation({
      query: (categoryInfo) => {
        return {
          url: "/category",
          method: "POST",
          body: categoryInfo,
        };
      },
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useGetSingleCategoryQuery,
} = categoryApi;
