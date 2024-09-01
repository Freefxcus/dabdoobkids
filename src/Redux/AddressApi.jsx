import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const AddressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.dabdoobkidz.com/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
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
    }),
    getAddress: builder.query({
      query: () => "/addresses",
    }),
    updateAddress: builder.mutation({
      query: ({ id, body }) => {
        const governorate = +body.governorate;
        const city = +body.city;
        return {
          url: `/addresses/${id}`,
          method: "PUT",
          body: { ...body, governorate, city },
        };
      },
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/addresses/${id}`,
        method: "DELETE",
      }),
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
