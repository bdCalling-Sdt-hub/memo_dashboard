import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './server'

export const baseApis = createApi({
  reducerPath: 'salonApis',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    headers: {
      Authorization: `${JSON.parse(localStorage.getItem('token')) || ''}`,
    },
  }),
  tagTypes: [
    'Post',
    'customers',
    'category',
    'privacyPolicy',
    'termsAndCondition',
    'shop',
    'profile',
    'notifications',
  ],
  endpoints: () => ({}),
})
