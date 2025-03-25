import { baseApis } from './baseApis'

const clientApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    updateClient: builder.mutation({
      query: (data) => ({
        url: '/client/update',
        method: 'PATCH',
        body: data,
      }),
    }),
    updateClientStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/client/update-status/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    getAllClients: builder.query({
      query: () => ({
        url: '/client/get-all-client',
        method: 'GET',
      }),
    }),
    getNearbyShops: builder.query({
      query: () => ({
        url: '/client/get-nearby-shop',
        method: 'GET',
      }),
    }),
    getSingleShop: builder.query({
      query: (id) => ({
        url: `/client/single-shop/${id}`,
        method: 'GET',
      }),
    }),
    addShopDetails: builder.mutation({
      query: (data) => ({
        url: '/client/add-shop-details',
        method: 'POST',
        body: data,
      }),
    }),
    addBankDetails: builder.mutation({
      query: (data) => ({
        url: '/client/add-bank-details',
        method: 'POST',
        body: data,
      }),
    }),
    getShopDetails: builder.query({
      query: (id) => ({
        url: `/client/get-shop-details/${id}`,
        method: 'GET',
      }),
    }),
    getPayOnShopData: builder.query({
      query: () => ({
        url: '/client/pay-on-shop-data',
        method: 'GET',
      }),
    }),
    payAdminFee: builder.mutation({
      query: (data) => ({
        url: '/client/pay-admin-fee',
        method: 'POST',
        body: data,
      }),
    }),
    notifyAllShops: builder.mutation({
      query: (data) => ({
        url: '/client/notify-all-shops',
        method: 'POST',
        body: data,
      }),
    }),
    notifySingleShop: builder.mutation({
      query: ({ id, data }) => ({
        url: `/client/notify-single-shop/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useUpdateClientMutation,
  useUpdateClientStatusMutation,
  useGetAllClientsQuery,
  useGetNearbyShopsQuery,
  useGetSingleShopQuery,
  useAddShopDetailsMutation,
  useAddBankDetailsMutation,
  useGetShopDetailsQuery,
  useGetPayOnShopDataQuery,
  usePayAdminFeeMutation,
  useNotifyAllShopsMutation,
  useNotifySingleShopMutation,
} = clientApis

export default clientApis
