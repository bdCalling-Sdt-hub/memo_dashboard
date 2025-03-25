import { baseApis } from "./baseApis";
const shopCategoryApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        createShopCategory: builder.mutation({
            query: (data) => ({
                url: '/shop-category/create',
                method: 'POST',
                body: data,
            }),
        }),
        updateShopCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `/shop-category/update/${id}`,
                method: 'PATCH',
                body: data,
            }),
        }),
        deleteShopCategory: builder.mutation({
            query: (id) => ({
                url: `/shop-category/delete/${id}`,
                method: 'DELETE',
            }),
        }),
        getAllShopCategories: builder.query({
            query: () => ({
                url: '/shop-category/get-all',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useCreateShopCategoryMutation,
    useUpdateShopCategoryMutation,
    useDeleteShopCategoryMutation,
    useGetAllShopCategoriesQuery,
} = shopCategoryApis;