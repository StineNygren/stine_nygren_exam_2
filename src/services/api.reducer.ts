import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Venue } from "../types/types";
import { token } from "./localeStorage/localeStorage";

///  transformResponse: (response: { data: Venue }) => response.data, is roe when the data is an object and not an array "data"


export const holidazeApi = createApi({
  reducerPath: "holidazeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://v2.api.noroff.dev",
    prepareHeaders: (headers) => {
      // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGVyX1RvcmUiLCJlbWFpbCI6InBlcnRvcmVAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MTI3NTQ2MjB9.zXq6BlDF_9L29j6e4IwLRxilna8JTx37dK8n9laxDPQ"
      headers.set('content-type', 'application/json');
      headers.set('X-Noroff-API-Key', '2903952c-f44b-449f-95e3-8694ba4c93ad');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },

  }),


endpoints: (builder) => ({
    getVenues: builder.query<Array<Venue>, void>({
      query: () => '/holidaze/venues',
      transformResponse: (response: { data: Array<Venue> }) => response.data,
    }),
    searchVenues: builder.query<Array<Venue>, string>({
      query: (search) => `/holidaze/venues/search?q=${search}`,
      transformResponse: (response: { data: Array<Venue> }) => response.data,
    }),
    getVenue: builder.query<Venue, string>({
        query: (id) => `/holidaze/venues/${id}`,
        transformResponse: (response: { data: Venue }) => response.data,
    }),
    createVenue: builder.mutation<Venue, Partial<Venue>>({
      query: (body) => ({
        url: '/holidaze/venues',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
  }),

});

export const { 
  useGetVenuesQuery, 
  useGetVenueQuery,
  useCreateVenueMutation,
  useSearchVenuesQuery,
  useLoginMutation,
  useRegisterMutation,

} = holidazeApi;
