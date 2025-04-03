import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../Main/apiSlice";
import  productReducer  from "../Main/ProductSlice";
import  filterReducer  from "../SideBar/FilterSlice";

export const store = configureStore({
    reducer:{
        [productApi.reducerPath]:productApi.reducer,
        productdata:productReducer,
        filterdata:filterReducer
    },
     middleware:(getDefaultMiddleware)=> getDefaultMiddleware({serializableCheck:{warnAfter:40}}).concat(productApi.middleware),
    
});
export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;