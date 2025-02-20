import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "../utils/baseUrl";

const backendUrl = baseUrl.production;

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
      query: () => `${backendUrl}/cart`,
      providesTags: ["cartItems"],
    }),

    deleteFromCart: builder.mutation({
      query: (id) => ({
        url: `${backendUrl}/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cartItems"],
    }),
    deleteAllCart: builder.mutation({
      query: () => ({
        url: `${backendUrl}/cart/`,
        method: "DELETE",
      }),
      invalidatesTags: ["cartItems"],
    }),
    updateQuantity: builder.mutation({
      query: (payload) => ({
        url: `${backendUrl}/cart/${payload.id}`,
        method: "PUT",
        body: {
          count: payload.count,
        },
      }),
      invalidatesTags: ["cartItems"],
    }),
    addToCart: builder.mutation({
      query: (payload) => ({
        url: `${backendUrl}/cart/`,
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
