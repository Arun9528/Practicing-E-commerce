import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductData } from "../Header/Header";

interface Productfilter{
    ProductData:ProductData[];
}
const initialState:Productfilter={
    ProductData:[]
}
export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        addItem:(state,action:PayloadAction<ProductData>)=>{
                const findProduct = state.ProductData.find((d)=>d.id === action.payload.id);
                const Index = state.ProductData.findIndex(d=>d.id === findProduct?.id);
                if(Index !== -1){
                    state.ProductData[Index].quantity = action.payload.quantity;
                }else{
                    state.ProductData.push(action.payload)
                }
        },
        addquantityCount:(state,action:PayloadAction<ProductData | undefined>)=>{
                const index = state.ProductData.findIndex((d)=>d.id === action.payload?.id);
                if(index !== -1 ){
                    state.ProductData[index].quantity += 1; 
                }
        },
        removequantityCount:(state,action:PayloadAction<ProductData | undefined>)=>{
            const index = state.ProductData.findIndex((d)=>d.id === action.payload?.id);
                if(index !== -1 ){
                    state.ProductData[index].quantity -= 1; 
                }
                if(state.ProductData[index].quantity === 0){
                    state.ProductData = state.ProductData.filter((d)=> d.id !== action.payload?.id)
                }
        },
        removeProduct:(state,action:PayloadAction<string>)=>{  
            state.ProductData = state.ProductData.filter(d=>d.id !== action.payload)
        },
    }
});
export const {addItem,addquantityCount,removequantityCount,removeProduct} = productSlice.actions;
export default productSlice.reducer;