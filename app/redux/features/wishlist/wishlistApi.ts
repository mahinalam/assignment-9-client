import { TQueryParam } from "@/types";
import { baseApi } from "../../api/baseApi";

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsersWishlist: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/wishlist",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["wishlist"],
    }),
    createWishlist: builder.mutation({
      query: (data: Record<string, unknown>) => ({
        url: "/wishlist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),

    deleteWishlist: builder.mutation({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useGetUsersWishlistQuery,
  useCreateWishlistMutation,
  useDeleteWishlistMutation,
} = wishlistApi;
