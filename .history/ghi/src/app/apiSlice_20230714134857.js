import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import myReviews from "../MyReviews";

export const npsApi = createApi({
  reducerPath: "npsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => ({
        url: 'api/wishlists',
        credentials: 'include',
        visited: true
      }),
      cons
      transformResponse: (response) => response.wishlist_items,
      providesTags: ["Wishlist"]
    }),
    deleteWishlist: builder.mutation({
      query: (wishlist_item_id) => ({
        url: `/api/wishlists/${wishlist_item_id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Wishlist"],
    }),
    getVisited: builder.query({
      query: () => ({
        url: 'api/wishlists',
        credentials: 'include'
      }),
      transformResponse: (response) => response.visited_list_items,
      providesTags: ["Visited"]
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
    submitReview: builder.mutation({
      query: ({ parkCode, review, rating }) => {
        const body = {
          "parkCode": parkCode,
          "review": review,
          "rating": rating
      };
        console.log(body)
        return {
          url: "/api/reviews",
          method: "POST",
          body,
          credentials: "include",
        };
      },
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
  useSubmitReviewMutation,
  useDeleteWishlistMutation
} = npsApi;
