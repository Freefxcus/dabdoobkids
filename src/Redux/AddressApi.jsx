import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/baseUrl";

const backendUrl = baseUrl.production;

const AddressApi = createApi({
  reducerPath: "addresses",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAddress: builder.query({
      query: () => `${backendUrl}/addresses`,
      providesTags: ["addresses"],
    }),
    addAddress: builder.mutation({
      query: (body) => {
        const governorate = +body.governorate;
        const city = +body.city;
        return {
          url: "/addresses",
          method: "POST",
          body: { ...body, governorate, city },
        };
      },
      invalidatesTags: ["addresses"],
    }),

    updateAddress: builder.mutation({
      query: ({ id, body }) => {
        const governorate = +body.governorate;
        const city = +body.city;
        return {
          url: `${backendUrl}/addresses/${id}`,
          method: "PUT",
          body: { ...body, governorate, city },
        };
      },
      invalidatesTags: ["addresses"],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `${backendUrl}/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["addresses"],
    }),
  }),
});

export const {
  useAddAddressMutation,
  useGetAddressQuery,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = AddressApi;

export default AddressApi;
