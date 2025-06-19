import { baseApi } from "../../api/baseApi";

const newsLetterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNewsLetter: builder.query({
      query: () => {
        return {
          url: "/news-letter",
          method: "GET",
        };
      },
      providesTags: ["news_letter"],
    }),
    createNewsLetter: builder.mutation({
      query: (payload: { email: string }) => {
        return {
          url: "/news-letter",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["news_letter"],
    }),
  }),
});

export const { useGetNewsLetterQuery, useCreateNewsLetterMutation } =
  newsLetterApi;
