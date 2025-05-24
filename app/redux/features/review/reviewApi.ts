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
    // getVendorProductReviews: builder.query({
    //   query: () => `/review/vendor-products-reviews`,
    //   providesTags: ["review"],
    // }),
    getVendorProductReviews: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/review/vendor-products-reviews`,
          method: "GET",
          params: params,
        };
      },
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
    getAllUsersReview: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/review/user-reviews`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["review"],
    }),

    createReview: builder.mutation({
      query: (formData: FormData) => ({
        url: "/review",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["review"],
    }),
    createPublicReview: builder.mutation({
      query: (payload: any) => ({
        url: "/review/public",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["review"],
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
  useGetAllUsersReviewQuery,
  useDeleteReviewMutation,
  useCreateReviewMutation,
  useCreatePublicReviewMutation,
} = reviewApi;
