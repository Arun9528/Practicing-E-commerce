import React, { ChangeEvent} from "react";
import { useDispatch } from "react-redux";
import { filterbyCategory } from "../FilterSlice";

interface inputProps{
    categoryName:string;
    setCategoryvalue:React.Dispatch<React.SetStateAction<string>>;
    checked:boolean;
}
export default function Input({categoryName,setCategoryvalue,checked}:inputProps){
    const categorydispatch = useDispatch()
    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setCategoryvalue(e.target.value)
        categorydispatch(filterbyCategory(e.target.value))
    }
    return (
       <div className="flex items-center">
            <input type="radio" name="category" id={categoryName} className="me-2" value={categoryName}
            onChange={handleChange} checked={checked}/>
            <label htmlFor={categoryName} className="capitalize">{categoryName}</label>
       </div>
    )
}