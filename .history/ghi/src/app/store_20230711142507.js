import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        [npsApi.reducerPath]: npsApi
    },
})