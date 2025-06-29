import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://electromert-e-commerce-server.vercel.app/api/v1",
  // baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", token);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: [
    "product",
    "category",
    "shop",
    "user",
    "review",
    "brand",
    "cart",
    "order",
    "coupon",
    "wishlist",
    "following_shop",
    "contact",
    "compare",
    "news_letter",
  ],
  endpoints: () => ({}),
});
