import { Outlet } from "react-router";
import Header, { ProductData } from "./Header/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "./App/store";
import { addItem } from "./Main/ProductSlice";


export default function App(){
   const [isDarkmode, setIsDarkmode] = useState<boolean>(()=>{
     const saved = localStorage.getItem("Darkmode");
     return saved ? JSON.parse(saved):false
   });
   const dispath = useDispatch();
   const ProductData = useSelector((state:Rootstate)=>state.productdata.ProductData);
  useEffect(()=>{
    const Productlist = localStorage.getItem("Productlist") || [] as ProductData[];
    if(Productlist.length < 0){
        localStorage.setItem("Productlist",JSON.stringify([]))
    }else{
      if(Productlist.length > 0){
        const a:ProductData[] = JSON.parse(Productlist as string);
          a.map((data)=>dispath(addItem(data)))
      }
    }
  },[dispath]);
  useEffect(()=>{
        localStorage.setItem("Darkmode",JSON.stringify(isDarkmode));
  },[isDarkmode]);

  useEffect(()=>{
      if(ProductData?.length > -1){
        localStorage.setItem("Productlist",JSON.stringify(ProductData));
      }
  },[ProductData])
  return (
    <div className={`min-h-screen ${isDarkmode ? "dark:bg-gray-900 dark:text-white" : ""}`}>
      <Header setIsDarkmode={setIsDarkmode} isDarkmode={isDarkmode}/>
      <Outlet context={isDarkmode}/>
    </div>
  )
}