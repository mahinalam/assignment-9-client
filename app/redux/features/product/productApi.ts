import { TQueryParam } from "@/types";
import { baseApi } from "../../api/baseApi";

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
    getSingleProduct: builder.query({
      query: (id: string) => `/product/${id}`,
    }),
    getAllVendorProducts: builder.query({
      query: (id: string) => `/product/vendor-products/${id}`,
    }),
    createProduct: builder.mutation({
      query: (formData: FormData) => ({
        url: "/product",
        method: "POST",
        body: formData,
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
} = productApi;
