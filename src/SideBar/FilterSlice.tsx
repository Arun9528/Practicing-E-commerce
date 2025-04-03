import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CardsProps } from "../Main/Components/Cards";

interface filtervaluebetween{
    min:number;
    max:number
}
export interface filterDataDetails extends CardsProps{
    category:string;
}
interface filterData{
    originalData:filterDataDetails[];
    filterData:filterDataDetails[];
}
const initialState:filterData ={
    originalData:[],
    filterData:[],
}
export const filterSlice = createSlice({
    name:"filterProduct",
    initialState,
    reducers:{
            StoreAlldata:(state,action:PayloadAction<filterDataDetails[]>)=>{
                state.originalData = action.payload
                state.filterData = action.payload
            },
            filterbyCategory:(state,action:PayloadAction<string>)=>{
                state.filterData = state.originalData.flat().filter((f)=>f.category === action.payload)
            },
            filterbyMininumValue:(state,action:PayloadAction<number>)=>{
                state.filterData = state.originalData.flat().filter((f)=>f.price < action.payload)
            },
            filterbyMaximumValue:(state,action:PayloadAction<number>)=>{
                state.filterData = state.originalData.flat().filter((f)=>f.price > action.payload)
            },
            filterinbettweenMinandMaxValue:(state,action:PayloadAction<filtervaluebetween>)=>{
                state.filterData = state.originalData.flat().filter((f)=>f.price >= action.payload.min && f.price <= action.payload.max)
            },
            filterbytitle:(state,action:PayloadAction<string>)=>{
                state.filterData = state.originalData.flat().filter((f)=>f.title.trim().toLowerCase().includes(action.payload))
            },
            resetFilter:(state)=>{
                state.filterData = state.originalData;
            }
    }
});
export const {filterbyCategory,StoreAlldata,resetFilter,filterbyMininumValue,filterbyMaximumValue,filterinbettweenMinandMaxValue,filterbytitle}  = filterSlice.actions;
export default filterSlice.reducer;