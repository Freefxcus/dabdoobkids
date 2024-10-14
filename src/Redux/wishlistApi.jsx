import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wishlistApi = createApi({
  reducerPath: "Wishlist",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
    prepareHeaders: (headers) => {
      if (localStorage.getItem("access_token")) {
        headers.set(
          "Authorization",
          `Bearer ${localStorage.getItem("access_token")}`
        );
      }
      return headers;
    },
  }),
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    //  SavedProductS ENDPOINTS =>
    getAllWishList: builder.query({
      query: () => `/wishlists`,
      providesTags: ["Wishlist"],
    }),

    addToWishList: builder.mutation({
      query: (productId) => ({
        url: `/wishlists/`,
        body: {
          product: productId,
        },
        method: "POST",
      }),
      invalidatesTags: ["Wishlist"],
    }),
    deleteWishList: builder.mutation({
      query: (productId) => ({
        url: `/wishlists`,
        body: {
          product: productId,
        },
        method: "PUT",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddToWishListMutation,
  useGetAllWishListQuery,
  useDeleteWishListMutation,
} = wishlistApi;
