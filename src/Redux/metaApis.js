import { baseApis } from './baseApis'

const metaApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getMetaData: builder.query({
      query: () => ({
        url: '/meta/get-meta-data',
        method: 'GET',
      }),
    }),
    getSalesProfitChartData: builder.query({
      query: (year) => ({
        url: `/meta/sales-profit-chart-data`,
        method: 'GET',
        params: {
          year: year,
        },
      }),
    }),
  }),
})

export const { useGetMetaDataQuery, useGetSalesProfitChartDataQuery } = metaApis
export default metaApis
