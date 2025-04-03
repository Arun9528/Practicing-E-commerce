import { ChangeEvent, useEffect, useState } from "react";
import Input from "./Components/input";
import { FaChevronDown,FaChevronUp } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { filterbyMaximumValue, filterbyMininumValue, filterinbettweenMinandMaxValue, resetFilter } from "./FilterSlice";
import { useOutletContext } from "react-router";

export default function Sidebar() {
  const contextDarkmode = useOutletContext();
  const [showall, setShowall] = useState<boolean>(false);
  const [categoryValue,setCategoryvalue] = useState<string>("");
  const [inputMinValue,setInputminValue] = useState<number | null>(null);
  const [inputMaxValue,setInputmaxValue] = useState<number | null>(null);
  const [error,setError] = useState<boolean>(false);
  const Categorylist = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];
  const ShowNumberofitem = 6;
  const CategorylistLength = Categorylist.length;
  const showCategory = showall ? CategorylistLength : ShowNumberofitem;
  const sliceItems = Categorylist.splice(0, showCategory);
  const Dispatch = useDispatch();
  const handleReset = ()=>{
    setCategoryvalue("");
    setInputminValue(null);
    setInputmaxValue(null);
    Dispatch(resetFilter())
  }
  
  useEffect(()=>{
    if(!inputMinValue){
      if(!inputMinValue && inputMaxValue) return;
      Dispatch(resetFilter());
      return;
    }
    if(inputMinValue && inputMaxValue) return;
    if(inputMinValue){
      Dispatch(filterbyMininumValue(inputMinValue));
    }
  },[inputMinValue,Dispatch,inputMaxValue]);

  useEffect(()=>{
    if(!inputMaxValue){
      if(!inputMaxValue && inputMinValue)return;
      Dispatch(resetFilter());
      return;
    };
    if(inputMinValue && inputMaxValue) return;
    if(inputMaxValue){
      Dispatch(filterbyMaximumValue(inputMaxValue));
    }
  },[inputMaxValue,Dispatch,inputMinValue]);

  useEffect(()=>{
    if(inputMinValue && inputMaxValue){
        if(inputMinValue > inputMaxValue){
          setError(true);
      }else{
        Dispatch(filterinbettweenMinandMaxValue({min:inputMinValue,max:inputMaxValue}))
      }
    }
  },[inputMinValue,inputMaxValue,Dispatch])
  return (
    <div className="col-span-2 border-r border-gray-300 p-3 space-y-7 min-h-screen">
      <div>
        <h2 className="font-bold text-2xl text-center mb-3">Price Range</h2>
        <div className="flex justify-between my-5">
          <input
            type="number"
            placeholder="Min"
            min={0}
            className={`ps-2 outline-0 border border-gray-300 w-24 rounded-sm py-1 placeholder:text-zinc-400 ${contextDarkmode && "dark:placeholder:text-white"}`}
            value={inputMinValue || ""}
            onChange={(e:ChangeEvent<HTMLInputElement>)=>{
              setInputminValue(+e.target.value)
              setError(false);
            }}
          />
          <input
            type="number"
            placeholder="Max" 
            min={0}
            className={`ps-2 outline-0 border border-gray-300 w-24 rounded-sm py-1 placeholder:text-zinc-400 ${contextDarkmode && "dark:placeholder:text-white"}`}
            value={inputMaxValue || ""}
            onChange={(e:ChangeEvent<HTMLInputElement>)=>{
              setInputmaxValue(+e.target.value)
              setError(false);
            }}
          />
        </div>
        {
          error && <p className="text-sm text-red-700">Invalid range: Minimum value cannot be greater than maximum value.</p>
        }
      </div>
      <div>
        <h2 className="font-bold text-2xl text-center mb-3">Category</h2>
        {sliceItems.map((list, i) => (
          <Input categoryName={list} key={i} setCategoryvalue={setCategoryvalue} checked={categoryValue === list}/>
        ))}
        <div className="cursor-pointer border border-zinc-700 flex items-center justify-center mt-2" onClick={()=> setShowall((prev)=>!prev)}>
          {
            showall ? (`View less`) : (`View More`)
          }
          {
            showall ? <FaChevronUp className="ms-2" /> : <FaChevronDown className="ms-2" />
          }
        </div>
      </div>
      <button
        type="button"
        className="py-2 px-3 bg-black text-white cursor-pointer rounded-md"
        onClick={handleReset}
      >
        Reset All Filter
      </button>
    </div>
  );
}
