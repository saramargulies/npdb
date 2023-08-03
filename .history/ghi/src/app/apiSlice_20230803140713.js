import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const npsApi = createApi({
  reducerPath: "npsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ``,
  }),
  endpoints: (builder) => ({
    getParkByCode: builder.query({
      query: () => ({
        url: `api/api/parks/code/${parkCode}`,
        credentials: "include",
      }),
      transformResponse: (response) => response.wishlist_items,
      providesTags: ["Park"],
    }),
    getWishlist: builder.query({
      query: () => ({
        url: `api/wishlists?visited=false`,
        credentials: "include",
      }),
      transformResponse: (response) => response.wishlist_items,
      providesTags: ["Wishlist"],
    }),
    deleteWishlist: builder.mutation({
      query: (wishlist_item_id) => ({
        url: `/api/wishlists/${wishlist_item_id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Wishlist", "Visited"],
    }),
    addToWishlist: builder.mutation({
      query: ({ parkCode, fullName, states }) => {
        const body = {
          parkCode: parkCode,
          fullName: fullName,
          states: states,
          visited: false,
        };
        return {
          url: "/api/wishlists",
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["Wishlist"],
    }),
    getVisited: builder.query({
      query: () => ({
        url: `api/wishlists?visited=true`,
        credentials: "include",
      }),
      transformResponse: (response) => response.wishlist_items,
      providesTags: ["Visited"],
    }),
    markAsVisited: builder.mutation({
      query: (wishlist_item_id) => {
        const body = {
          visited: true,
        };
        return {
          url: `/api/wishlists/${wishlist_item_id}`,
          method: "PUT",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["Wishlist", "Visited"],
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
      invalidatesTags: ["Account", "Wishlist", "Visited", "Reviews"],
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
      query: ({ parkCode, parkName, review, rating }) => {
        const body = {
          parkDetails: {
            parkName: parkName,
            parkCode: parkCode,
          },
          review: review,
          rating: rating,
        };
        return {
          url: "/api/reviews",
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["Reviews"],
    }),
    getReviewsByPark: builder.query({
      query: (parkCode) => ({
        url: `api/parks/${parkCode}/reviews`,
        credentials: "include",
      }),
      transformResponse: (response) => response.reviews,
      providesTags: ["Reviews"],
    }),
    updateParkReview: builder.mutation({
      query: ({ review_id, parkDetails, review, rating }) => {
        const body = {
          parkDetails: parkDetails,
          review: review,
          rating: rating,
        };
        return {
          url: `/api/reviews/${review_id}`,
          method: "PUT",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["Reviews"],
    }),
    getReviewsByAccount: builder.query({
      query: () => ({
        url: `api/reviews`,
        credentials: "include",
      }),
      transformResponse: (response) => response.reviews,
      providesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query: (review_id) => ({
        url: `/api/reviews/${review_id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Reviews"],
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
  useDeleteWishlistMutation,
  useGetReviewsByParkQuery,
  useUpdateParkReviewMutation,
  useGetReviewsByAccountQuery,
  useDeleteReviewMutation,
  useMarkAsVisitedMutation,
  useAddToWishlistMutation,
  useGetParkByCodeQuery
} = npsApi;
