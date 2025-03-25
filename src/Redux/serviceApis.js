import { baseApis } from './baseApis'

const serviceApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: ({ page, limit }) => ({
        url: '/shop-category/get-all',
        method: 'GET',
        params: {
          page: page,
          limit: limit,
        },
      }),
    }),
    getOneService: builder.query({
      query: ({ shopCategory, sort, searchTerm, page, limit }) => {
        console.log('shopCategory: ', shopCategory)
        return {
          url: '/service/get-all',
          method: 'GET',
          params: {
            shopCategory: shopCategory,
            page: page,
            limit: limit,
            sort: sort,
            searchTerm: searchTerm,
          },
        }
      },
    }),
  }),
})

export const { useGetAllServicesQuery, useGetOneServiceQuery } = serviceApis

// import { baseApis } from './baseApis'

// const serviceApis = baseApis.injectEndpoints({
//   endpoints: (builder) => ({
//     createService: builder.mutation({
//       query: (data) => ({
//         url: '/service/create-service',
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     updateService: builder.mutation({
//       query: ({ id, data }) => ({
//         url: `/service/update-service/${id}`,
//         method: 'PATCH',
//         body: data,
//       }),
//     }),
//     deleteService: builder.mutation({
//       query: (id) => ({
//         url: `/service/delete-service/${id}`,
//         method: 'DELETE',
//       }),
//     }),
//     getAllServices: builder.query({
//       query: () => ({
//         url: '/service/get-all',
//         method: 'GET',
//       }),
//     }),
//     getMyServices: builder.query({
//       query: () => ({
//         url: '/service/my-services',
//         method: 'GET',
//       }),
//     }),
//     getSingleService: builder.query({
//       query: (id) => ({
//         url: `/service/single-service/${id}`,
//         method: 'GET',
//       }),
//     }),
//   }),
// })

// export const {
//   useCreateServiceMutation,
//   useUpdateServiceMutation,
//   useDeleteServiceMutation,
//   useGetAllServicesQuery,
//   useGetMyServicesQuery,
//   useGetSingleServiceQuery,
// } = serviceApis
