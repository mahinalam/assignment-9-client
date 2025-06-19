import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/user",
        method: "POST",
        body: userInfo,
      }),
    }),
    signUpVendor: builder.mutation({
      query: (userInfo: Record<string, unknown>) => ({
        url: "/user/vendor",
        method: "POST",
        body: userInfo,
      }),
    }),
    signUpCustomer: builder.mutation({
      query: (userInfo: Record<string, unknown>) => ({
        url: "/user/customer",
        method: "POST",
        body: userInfo,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetMeQuery,
  useSignUpVendorMutation,
  useSignUpCustomerMutation,
} = authApi;
