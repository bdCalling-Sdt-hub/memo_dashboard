import { baseApis } from './baseApis'

const manageAccountsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdminInformation: builder.query({
      query: ({ page, limit }) => ({
        url: '/admin/all-admins',
        method: 'GET',
        params: {
          page,
          limit,
        },
      }),
      providesTags: ['manageProfile'],
    }),
    updateAdminStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/update-admin-status/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['manageProfile'],
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: '/user/create-admin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['manageProfile'],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/delete-admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['manageProfile'],
    }),
  }),
})

export const {
  useGetAllAdminInformationQuery,
  useUpdateAdminStatusMutation,
  useCreateAdminMutation,
  useDeleteAdminMutation,
} = manageAccountsApis
