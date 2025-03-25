import { baseApis } from './baseApis'

const changePasswordApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    updateAndChangePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/change-password`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useUpdateAndChangePasswordMutation } = changePasswordApis
