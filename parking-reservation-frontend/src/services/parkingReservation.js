import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = `${import.meta.env.VITE_MOVIE_API_KEY}`;

export const parkingReservationApi = createApi({
  reducerPath: 'parkingReservationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    register: builder.query({
      query: () => `register/`,
    }),
  }),
})

export const {
  useRegisterQuery 
} = parkingReservationApi
