import { baseApis } from './baseApis'

const transactionApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: ({ page, limit, senderEntityType }) => ({
        url: '/transaction/get-all-transaction',
        method: 'GET',
        params: {
          page: page,
          limit: limit,
          senderEntityType: senderEntityType,
        },
      }),
    }),
  }),
})

export const { useGetAllTransactionsQuery } = transactionApis
