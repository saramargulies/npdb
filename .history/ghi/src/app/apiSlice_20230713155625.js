import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const npsApi = createApi({
  reducerPath: "npsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => ({
        url: 'api/wishlists',
        credentials: 'include'
      }),
      transformResponse: (response) => response.wishlist_items,
      providesTags: ["Wishlist"]
    }),
    deleteWishlist: builder.mutation({
      query: (wishlist_list_item_id) => ({
        url: `/api/visited-lists/${visited_list_item_id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Visited"],
    }),
    getVisited: builder.query({
      query: () => ({
        url: 'api/visited-lists',
        credentials: 'include'
      }),
      transformResponse: (response) => response.visited_list_items,
      providesTags: ["Visited"]
    }),
    deleteVisited: builder.mutation({
      query: (visited_list_item_id) => ({
        url: `/api/visited-lists/${visited_list_item_id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Visited"],
    }),
    getAccount: builder.query({
      query: () => ({
        url: `/token`,
        credentials: "include",
      }),
      transformResponse: (response) => (response ? response.account : null),
      providesTags: ["Account"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/token",
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Account"],
    }),
    login: builder.mutation({
      query: ({ username, password }) => {
        const body = new FormData();
        body.append("username", username);
        body.append("password", password);
        return {
          url: "/token",
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["Account"],
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: "/api/accounts",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Account"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetAccountQuery,
  useGetWishlistQuery,
  useGetVisitedQuery,
  useDeleteVisitedMutation
} = npsApi;
