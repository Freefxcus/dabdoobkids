import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cartApi = createApi({
  reducerPath: "cartItems",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
    prepareHeaders: (headers) => {
      // Do something before request is sent
      if (localStorage.getItem("access_token")) {
        headers.set(
          "Authorization",
          `Bearer ${localStorage.getItem("access_token")}`
        );
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCarts: builder.query({
      //query: () => `/cart`,
      query: () => {
        const token = localStorage.getItem("access_token") ; //|| localStorage.getItem("guest_token");
        if (!token) return null; // Avoid unauthorized requests
        return `/cart`;
      },
      providesTags: ["cartItems"],
    }),

    deleteFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cartItems"],
    }),
    deleteAllCart: builder.mutation({
      query: () => ({
        url: `/cart/`,
        method: "DELETE",
      }),
      invalidatesTags: ["cartItems"],
    }),
    updateQuantity: builder.mutation({
      query: (payload) => ({
        url: `/cart/${payload.id}`,
        method: "PUT",
        body: {
          count: payload.count,
        },
      }),
      invalidatesTags: ["cartItems"],
    }),
    addToCart: builder.mutation({
      query: (payload) => ({
        url: `/cart/`,
        body: { items: payload },
        method: "POST",
      }),
      invalidatesTags: ["cartItems"],
    }),
  }),
});

// export const { useGetAllCartsQuery, useLazyGetAllCartsQuery, useUpdateQuantityMutation } = cartApi;

// }),
// });

export const {
  useGetAllCartsQuery,
  useLazyGetAllCartsQuery,
  useAddToCartMutation,
  useDeleteFromCartMutation,
  useDeleteAllCartMutation,
  useUpdateQuantityMutation,
  // useClearCartMutation,
  // useVerifyCartMutation,
} = cartApi;
export default cartApi;
