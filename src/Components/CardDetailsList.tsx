import { useDispatch, useSelector } from "react-redux"
import { Rootstate } from "../App/store"
import { useEffect, useState } from "react";
import { addquantityCount, removeProduct, removequantityCount } from "../Main/ProductSlice";
import { NavLink, useOutletContext } from "react-router";


export default function CardDetailsList(){
   const contextDarkmode= useOutletContext();
    const [TotalAmount,setTotalAmount]= useState<number>(0);
    const DataSelect = useSelector((state:Rootstate)=>state.productdata.ProductData);
    const dispatch = useDispatch();
    
   
   const handleincrement = (id:string)=>{
        const filterid = DataSelect.find((d)=> d.id === id);
       dispatch(addquantityCount(filterid));
   }
   const handleDecrement = (id:string)=>{
        const filterid = DataSelect.find((d)=> d.id === id);
        dispatch(removequantityCount(filterid))
   }
    
    useEffect(()=>{
        
        const TotalPriceCalculate = DataSelect.reduce((total,{price,quantity})=> total + (price * quantity),0);
        setTotalAmount(TotalPriceCalculate )
        
    },[DataSelect])
    return (
       <>
             <div>
                {
                    DataSelect.length === 0 ? (<div className="text-center my-20 font-bold text-6xl">Empty Product List</div>) :
                     (DataSelect?.map(({id,title,thumbnail,price,quantity},i)=>(
                        <div className="flex items-center mx-10 justify-between" key={id}>
                            <NavLink to={`/${title}`} className="flex items-center space-x-24">
                            <span>{i + 1}.</span> 
                            <img src={thumbnail} alt={title} className="size-24"/>
                            <p className="w-56">{title}</p>
                            <p className="w-32 text-center">${(price * quantity).toFixed(2)}</p>
                            </NavLink>
                            <div className="border-2 border-gray-500 rounded-sm flex">
                                <button type="button" className="border-r-2 border-gray-500 size-10 cursor-pointer " 
                                onClick={()=>handleDecrement(id)}
                                 >-</button>
                                <p className="w-20 text-center self-center font-semibold text-2xl">{quantity }</p>
                                <button type="button" className="border-l-2 border-gray-500 size-10 cursor-pointer" 
                                onClick={()=>handleincrement(id)}>+</button>
                            </div>
                            <button type="button" className="px-16 py-3 bg-black text-white rounded-md cursor-pointer" 
                            onClick={()=>dispatch(removeProduct(id))}>Remove</button>
                        </div>
                    )))
                }
            </div>
            <hr className={`border-2  ${contextDarkmode ? "border-white" : " border-black"}`} />
            <div className="mt-4">
                <p className="text-end me-32 font-bold text-2xl">Total Amount: &nbsp;${TotalAmount.toFixed(2)}</p>
            </div>
       </>
    )
}