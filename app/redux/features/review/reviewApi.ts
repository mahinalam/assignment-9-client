import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendorProductReviews: builder.query({
      query: (id: string) => `/review/vendor-products-reviews/${id}`,
    }),
    getProductReviews: builder.query({
      query: (id: string) => `review/${id}`,
    }),
  }),
});

export const { useGetVendorProductReviewsQuery, useGetProductReviewsQuery } =
  reviewApi;
