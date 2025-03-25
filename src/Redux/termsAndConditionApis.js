import { baseApis } from './baseApis'

const termsAndConditionApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => {
        return {
          url: '/manage/get-terms-conditions',
          method: 'GET',
        }
      },
      providesTags: ['termsAndCondition'],
    }),
    createTermsAndConditions: builder.mutation({
      query: (data) => {
        return {
          url: '/manage/add-terms-conditions',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['termsAndCondition'],
    }),
  }),
})

export const {
  useGetTermsAndConditionsQuery,
  useCreateTermsAndConditionsMutation,
} = termsAndConditionApis

export default termsAndConditionApis
