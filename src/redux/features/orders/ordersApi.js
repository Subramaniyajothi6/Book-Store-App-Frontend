import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include',
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder,
                credentials: 'include',
            }),
            invalidatesTags: ['Orders'], // Invalidate Orders cache after creating a new order
            transformResponse: (response) => response,
            transformErrorResponse: (response) => {
                // Optional: custom error handling
                return response?.data || { message: 'An error occurred while creating the order' };
            }
        }),
        getOrderByEmail: builder.query({
            query: (email) => ({
                url: `/email/${email}`,
                method: 'GET'
            }),
            providesTags: (result, error, email) => 
                result 
                    ? [
                        ...result.map(({ id }) => ({ type: 'Orders', id })),
                        { type: 'Orders', id: 'LIST' }
                    ]
                    : [{ type: 'Orders', id: 'LIST' }],
            // Optional: transform response if needed
            transformResponse: (response) => response
        }),
        // Example of additional endpoint
        getOrderById: builder.query({
            query: (orderId) => ({
                url: `/${orderId}`,
                method: 'GET'
            }),
            providesTags: (result, error, orderId) => 
                result 
                    ? [{ type: 'Orders', id: orderId }]
                    : []
        })
    })
});

// Export hooks for use in components
export const { 
    useCreateOrderMutation, 
    useGetOrderByEmailQuery,
    useGetOrderByIdQuery // newly added
} = ordersApi;

export default ordersApi;