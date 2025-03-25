import { baseApis } from './baseApis'

const staffApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllStaff: builder.query({
      query: ({ page, limit, searchTerm, sort }) => ({
        url: '/staff/all-staff',
        method: 'GET',
        params: {
          page: page,
          limit: limit,
          searchTerm: searchTerm,
          sort: sort,
        },
      }),
    }),
  }),
})

export const { useGetAllStaffQuery } = staffApis
