import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const npsApi = createApi({
    reducerPath: 'npsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:8000'
    }),
    endpoints: (builder) => ({
        
    })
})