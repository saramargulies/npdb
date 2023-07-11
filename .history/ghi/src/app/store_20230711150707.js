import { configureStore } from '@reduxjs/toolkit'
import { npsApi } from './apiSlice'

export const store = configureStore({
    reducer: {
        // [npsApi.reducerPath]: npsApi.reducer
    },

})