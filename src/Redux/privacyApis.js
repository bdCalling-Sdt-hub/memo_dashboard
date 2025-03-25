import { baseApis } from './baseApis'

const privacyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => {
        return {
          url: '/manage/get-privacy-policy',
          method: 'GET',
        }
      },
      providesTags: ['privacyPolicy'],
    }),
    createPrivacy: builder.mutation({
      query: (data) => {
        return {
          url: '/manage/add-privacy-policy',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['privacyPolicy'],
    }),
  }),
})

export const { useCreatePrivacyMutation, useGetPrivacyQuery } = privacyApis

export default privacyApis
