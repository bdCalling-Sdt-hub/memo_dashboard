import { baseApis } from './baseApis'

const notificationApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: ({ limit, page }) => ({
        url: '/notification/get-all-notification',
        method: 'GET',
        params: {
          limit: limit,
          page: page,
        },
      }),
      providesTags: ['notifications'],
    }),
    readAllNotifications: builder.mutation({
      query: () => ({
        url: '/notification/see-notification',
        method: 'PATCH',
      }),
      invalidatesTags: ['notifications'],
    }),
  }),
})

export const { useGetAllNotificationsQuery, useReadAllNotificationsMutation } =
  notificationApis
export default notificationApis
