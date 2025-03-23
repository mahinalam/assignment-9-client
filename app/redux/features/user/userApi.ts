import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
    getUserStats: builder.query({
      query: () => ({
        url: "/user/user-stats",
        method: "GET",
      }),
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
} = userApi;
