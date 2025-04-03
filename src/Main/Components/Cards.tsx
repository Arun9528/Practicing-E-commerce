import { useEffect, useState } from "react";
// import { BsCartPlus } from "react-icons/bs";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// import { useDispatch } from "react-redux";
import { NavLink, useOutletContext } from "react-router";
// import { addItem } from "../ProductSlice";


export interface CardsProps {
  id?: string;
  title: string;
  price: number;
  thumbnail: string;
  discountPercentage: number;
  rating: number;
  availabilityStatus?:string;
}
export default function Cards({
  title,
  price,
  thumbnail,
  discountPercentage,
  rating,
  availabilityStatus
}: CardsProps) {
    const [halfstar,sethalfStar] = useState<boolean>(false);
    const [RatingLength,setRatinglength] = useState<number>(0);
  const Originalprice = price / (1 - discountPercentage / 100);
  const contextDarkmode = useOutletContext()
  // const dispatch = useDispatch();
  useEffect(()=>{
    const r = rating.toString().slice(2,5);
    if(+r < 55){
        sethalfStar(true);
        setRatinglength(Math.floor(+rating))
    }else if(+r > 55){
        setRatinglength(Math.ceil(+rating))
    }

  },[rating])
  
  return (
    <NavLink to={`/${title}`} className="w-[20rem] h-[26rem] shadow-sm shadow-zinc-800/50 inset-shadow-sm rounded-md p-6 dark:shadow-white">
      <div className="relative">
         <img
          src={thumbnail}
          alt={title}
          className="overflow-hidden w-full h-[16rem]"
        />
        {availabilityStatus === "Out of Stock" && 
           <div className={`absolute top-0 left-0 right-0 bottom-0 ${contextDarkmode ? "bg-gray-100/60" :  "bg-zinc-300/60"}`}>
              <p className="font-bold text-red-600 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">Out of Stock</p>
           </div>
        }
      </div>
      <div className="flex flex-col justify-around h-28">
        <p className="font-bold text-lg">{title}</p>
        <p className=" flex items-center space-x-1">
          {/* {rating} <FaStar className="ms-1" /> */}
          {
            [...Array(RatingLength)].map((_,i)=><FaStar key={i} color="yellow"/>)
          }
          {
            halfstar && <FaStarHalfAlt color="yellow"/>
          }
        </p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <p>${price}</p>
            <p className="line-through text-gray-400 text-[14px] self-center font-semibold">
              ${Originalprice.toFixed(2)}
            </p>
            <p className="text-green-800 font-bold text-[13px] self-center">
              {Math.ceil(discountPercentage)}% off
            </p>
          </div>
          {
            (availabilityStatus === "Out of Stock") && <p className="text-[14px] font-bold text-red-500">({availabilityStatus})</p>
          }
          {/* <button
            type="button"
            className="cursor-pointer"
            onClick={()=>dispatch(addItem({id,title,thumbnail,price,quantity:1}))}
          >
            <BsCartPlus size={22}/>
          </button> */}
        </div>
      </div>
    </NavLink>
  );
}
