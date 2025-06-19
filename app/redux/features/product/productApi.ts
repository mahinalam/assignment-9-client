import { baseApi } from "../../api/baseApi";

import { TQueryParam } from "@/types";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/product",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["product"],
    }),
    getAllFeaturedProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/product/featured",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["product"],
    }),
    getAllFlashProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/product/flash",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["product"],
    }),
    getAllProductsByCategory: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/product",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["product"],
    }),
    getSingleProduct: builder.query({
      query: (id: string) => `/product/single-product/${id}`,
      providesTags: ["product"],
    }),

    // getAllVendorProducts: builder.query({
    //   query: (shopId: string) => `/product/vendor-products/${shopId}`,
    //   providesTags: ["product"],
    // }),

    createProduct: builder.mutation({
      query: (formData: FormData) => ({
        url: "/product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation({
      query: (formData: FormData) => ({
        url: "/product",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    updateProductStatus: builder.mutation({
      query: (updatedInfo: any) => ({
        url: "/product/update-product",
        method: "PATCH",
        body: updatedInfo,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetAllVendorProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsByCategoryQuery,
  useGetAllFeaturedProductsQuery,
  useGetAllFlashProductsQuery,
  useUpdateProductStatusMutation,
  useUpdateProductMutation,
} = productApi;
