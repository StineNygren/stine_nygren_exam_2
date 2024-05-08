import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Venue } from "../types/types";
import { token } from "./localeStorage/localeStorage";
import { ProfileResponse } from "../types/types";



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
    getVenues: builder.query<Array<Venue>, number>({
      query: (page) => `/holidaze/venues?limit=50&page=${page}`,
      transformResponse: (response: { data: Array<Venue> }) => response.data,
    }),
    searchVenues: builder.query<Array<Venue>, { search: string, page: number }>({
      query: ({search, page}) => `/holidaze/venues${search}limit=50&page=${page}`,
      transformResponse: (response: { data: Array<Venue> }) => response.data,
    }),
    getVenue: builder.query<Venue, string>({
        query: (id) => `/holidaze/venues/${id}?_bookings=true`,
        transformResponse: (response: { data: Venue }) => response.data,
    }),
    createVenue: builder.mutation<Venue, Partial<Venue>>({
      query: (body) => ({
        url: '/holidaze/venues',
        method: 'POST',
        body,
      }),
    }),
    createBooking: builder.mutation({
      query: (body) => ({
        url: '/holidaze/bookings',
        method: 'POST',
        body,
      }),
    }),
    editVenue: builder.mutation({
      query: ({body, id}) => ({
        url: `/holidaze/venues/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login?_holidaze=true',
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
    getProfile: builder.query({
      query: (user) => `/holidaze/profiles/${user}?_venues=true&_bookings=true`,
      transformResponse: (response: { data: ProfileResponse }) => response.data,
    }),
    editProfile: builder.mutation({
      query: ({ user, profile }) => ({
        url: `/holidaze/profiles/${user}`,
        method: 'PUT',
        body: profile
      }),
    }),
    deleteVenue: builder.mutation({
      query: (id) => ({
        url: `/holidaze/venues/${id}`,
        method: 'DELETE',
      }),
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/holidaze/bookings/${id}`,
        method: 'DELETE',
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
  useGetProfileQuery,
  useDeleteVenueMutation,
  useEditProfileMutation,
  useEditVenueMutation,
  useCreateBookingMutation,
  useDeleteBookingMutation,
  

} = holidazeApi;
