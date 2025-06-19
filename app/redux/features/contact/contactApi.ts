import { baseApi } from "../../api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (contactInfo) => {
        return {
          url: "/contact",
          method: "POST",
          body: contactInfo,
        };
      },
      invalidatesTags: ["contact"],
    }),
  }),
});

export const { useSendMessageMutation } = contactApi;
