import { baseApis } from './baseApis'
const shopApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    updateShop: builder.mutation({
      query: ({ id, data }) => ({
        url: `/client/update-status/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['shop'],
    }),
    getAllShop: builder.query({
      query: ({ searchTerm, page, limit, status }) => ({
        url: '/client/get-all-client',
        method: 'GET',
        params: {
          page: page,
          limit: limit,
          status: status,
          searchTerm: searchTerm,
        },
      }),
      providesTags: ['shop'],
    }),
    getOneShopDetails: builder.query({
      query: ({ id }) => ({
        url: `/client/get-shop-details/${id}`,
        method: 'GET',
      }),
      providesTags: ['shop'],
    }),
    getAllServiceFromOneShop: builder.query({
      query: ({ page, limit, shop }) => {
        return {
          url: `/service/get-all`,
          method: 'GET',
          params: {
            page: page,
            limit: limit,
            shop: shop,
          },
        }
      },
      providesTags: ['shop'],
    }),
    getOneShopBusinessHour: builder.query({
      query: ({ entityId, entityType }) => {
        return {
          url: `/business-hour/get-business-hour`,
          method: 'GET',
          params: {
            entityId: entityId,
            entityType: entityType,
          },
        }
      },
      providesTags: ['shop'],
    }),
    getOneShopAllStaff: builder.query({
      query: ({ page, limit, shop }) => {
        return {
          url: `/staff/all-staff`,
          method: 'GET',
          params: {
            page: page,
            limit: limit,
            shop: shop,
          },
        }
      },
      providesTags: ['shop'],
    }),
  }),
})

export const {
  useGetAllShopQuery,
  useGetOneShopBusinessHourQuery,
  useGetOneShopAllStaffQuery,
  useUpdateShopMutation,
  useGetOneShopDetailsQuery,
  useGetAllServiceFromOneShopQuery,
} = shopApis
