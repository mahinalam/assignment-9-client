import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    getSingleUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
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
        console.log("from hook", formData);

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
