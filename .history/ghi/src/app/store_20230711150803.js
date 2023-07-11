import { configureStore } from '@reduxjs/toolkit'
import { npsApi } from './apiSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'


export const store = configureStore({
    reducer: {
        [npsApi.reducerPath]: npsApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(npsApi.middleware)
})

setupListeners(store.dispatch)