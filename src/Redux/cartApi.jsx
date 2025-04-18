import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cartApi = createApi({
  reducerPath: "cartItems",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token") || localStorage.getItem("guest_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    /*getAllCarts: builder.query({
      //query: () => `/cart`,
      query: () => {
        const token = localStorage.getItem("access_token") ; //|| localStorage.getItem("guest_token");
        if (!token) return { data: [] };
        return `/cart`;
      },
      providesTags: ["cartItems"],
    }),*/
    getAllCarts: builder.query({
      queryFn: async (_arg, _queryApi, _extraOptions, fetchWithBQ) => {
        const token = localStorage.getItem("access_token") || localStorage.getItem("guest_token");
        if (!token) {
          return { data: [] }; // don't call the server without token
        }
    
        const result = await fetchWithBQ("/cart");
        return result;
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
