import { baseApis } from './baseApis'

const customerApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/customer/get-all/?`,
        method: 'GET',
        params: {
          page: page,
          limit: limit,
          searchTerm: searchTerm,
        },
      }),
      providesTags: ['customers'],
    }),

    blockUnblockCustomer: builder.mutation({
      query: ({ id, status }) => ({
        url: `/user/block-unblock/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['customers'],
    }),
  }),
})

export const { useGetAllCustomersQuery, useBlockUnblockCustomerMutation } =
  customerApis

// import { baseApis } from './baseApis'

// const customerApis = baseApis.injectEndpoints({
//   endpoints: (builder) => ({
//     getAllCustomers: builder.query({
//       query: () => ({
//         url: '/customer/get-all',
//         method: 'GET',
//       }),
//       providesTags: ['customers'],
//     }),

//     blockUnblockCustomer: builder.mutation({
//       query: ({ id, status }) => {
//         return {
//           url: `/user/block-unblock/${id}`,
//           method: 'PATCH',
//           body: { status },
//         }
//       },
//       invalidatesTags: ['customers'],
//     }),
//   }),
// })

// export const { useGetAllCustomersQuery, useBlockUnblockCustomerMutation } =
//   customerApis
