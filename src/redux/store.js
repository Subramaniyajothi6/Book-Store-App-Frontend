import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import cartReducer from './features/cart/cartSlice';
import ordersApi from './features/orders/ordersApi';
import booksApi from './features/books/booksApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer, // Add ordersApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware), // Add ordersApi middleware
});

setupListeners(store.dispatch);