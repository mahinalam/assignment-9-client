import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendorProductReviews: builder.query({
      query: (id: string) => `/review/vendor-products-reviews/${id}`,
      providesTags: ["review"],
    }),
    getProductReviews: builder.query({
      query: (id: string) => `review/${id}`,
      providesTags: ["review"],
    }),
    getUserProductReview: builder.query({
      query: (id: string) => `review/user-products-reviews/${id}`,
      providesTags: ["review"],
    }),
  }),
});

export const {
  useGetVendorProductReviewsQuery,
  useGetProductReviewsQuery,
  useGetUserProductReviewQuery,
} = reviewApi;
