import { baseApis } from './baseApis'

const profileApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getProfileInformation: builder.query({
      query: () => ({
        url: '/user/get-my-profile',
        method: 'GET',
      }),
      providesTags: ['profile'],
    }),
    updateProfileInformation: builder.mutation({
      query: (data) => ({
        url: '/admin/update-admin-profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['profile'],
    }),
    updateSuperAdminProfileInformation: builder.mutation({
      query: (data) => ({
        url: '/super-admin/update-profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['profile'],
    }),
  }),
})

export const {
  useGetProfileInformationQuery,
  useUpdateSuperAdminProfileInformationMutation,
  useUpdateProfileInformationMutation,
} = profileApis
