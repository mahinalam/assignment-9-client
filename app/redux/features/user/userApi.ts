import { baseApi } from "../../api/baseApi";

import { TQueryParam } from "@/types";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/user",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["user"],
    }),
    getSingleUser: builder.query({
      query: () => ({
        url: `/user/single-user`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getUserStats: builder.query({
      query: () => ({
        url: "/user/user-stats",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getVendorStats: builder.query({
      query: () => ({
        url: "/user/vendor-stats",
        method: "GET",
      }),
    }),
    getAdminStats: builder.query({
      query: () => ({
        url: "/user/admin-stats",
        method: "GET",
      }),
    }),
    updateMyProfile: builder.mutation({
      query: (formData: FormData) => {
        return {
          url: "/user",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (userId: string) => {
        return {
          url: `/user/${userId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useGetMeQuery,
  useUpdateMyProfileMutation,
  useGetUserStatsQuery,
  useGetAdminStatsQuery,
  useGetVendorStatsQuery,
  useDeleteUserMutation,
} = userApi;
