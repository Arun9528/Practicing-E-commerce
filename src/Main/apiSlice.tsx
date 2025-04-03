import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const productApi = createApi({
    reducerPath:"productApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://dummyjson.com"}),
    endpoints:(build)=>({
        getProductdata:build.query({
            query:(name)=>`products?limit=${name}`,
        }),
        searchProductdata:build.query({
            query:(name)=>`products/search?q=${name}`
        })
    }),
})
export const {useGetProductdataQuery,useSearchProductdataQuery} = productApi;