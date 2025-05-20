import { TQueryParam } from "@/types";
import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/review",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["review"],
    }),
    getVendorProductReviews: builder.query({
      query: () => `/review/vendor-products-reviews`,
      providesTags: ["review"],
    }),
    getProductReviews: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/review/product/review",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["review"],
    }),
    getUserProductReview: builder.query({
      query: (id: string) => `review/user-products-reviews/${id}`,
      providesTags: ["review"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useGetVendorProductReviewsQuery,
  useGetProductReviewsQuery,
  useGetUserProductReviewQuery,
  useDeleteReviewMutation,
} = reviewApi;
