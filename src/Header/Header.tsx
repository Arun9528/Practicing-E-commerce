import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMoon, IoSearchSharp } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import { Link, NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../App/store";
import { filterbytitle, filterDataDetails, resetFilter } from "../SideBar/FilterSlice";

export interface ProductData {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
  category?: string;
}
interface HeaderProps {
  isDarkmode: boolean;
  setIsDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Header({ isDarkmode, setIsDarkmode }: HeaderProps) {
  const [InputValue, setInputvalue] = useState<string>("");
  const [Debouncevalue, setDebouncevalue] = useState<string>("");
  const [showSearch, setShowsearch] = useState<boolean>(false);
  const [showFilterdata, setShowfilterdata] = useState<filterDataDetails[]>([]);
  const InputfousRef = useRef<HTMLInputElement>(null);
  const DataitemCount = useSelector(
    (state: Rootstate) => state.productdata.ProductData.length
  );
  const filteredData = useSelector(
    (state: Rootstate) => state.filterdata.filterData
  );
  const Dispatch = useDispatch();
  const handledarkmode = () => setIsDarkmode((prev) => !prev);

  useEffect(() => {
    if (!InputValue.trim()) {
      setDebouncevalue("");
      return;
    }
    const time = setTimeout(() => {
      setDebouncevalue(InputValue.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(time);
  }, [InputValue]);

  useEffect(() => {
    if (!Debouncevalue) {
      setShowfilterdata([]);
      Dispatch(resetFilter());
      setShowsearch(false);
      return;
    }
    Dispatch(filterbytitle(Debouncevalue));
  }, [Debouncevalue, Dispatch]);

  useEffect(() => {
    if (!Debouncevalue) {
      setShowfilterdata([]);
      setShowsearch(false);
      return;
    }
    setShowfilterdata(filteredData);
    setShowsearch(filteredData.length > 0);
  }, [filteredData, Debouncevalue]);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        InputfousRef.current &&
        !InputfousRef.current.contains(e.target as Node)
      ) {
        InputfousRef.current.blur();
        setShowsearch(false);
      }
    },
    [InputfousRef]
  );

  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <header
      className={`flex items-cente dark justify-between px-10 py-5 border-b-2 border-gray-300
      ${isDarkmode && "dark:bg-gray-900 text-white"}
      `}
    >
      <NavLink to={"/"}>
        <h1 className="font-bold text-2xl">E-Commerce</h1>
      </NavLink>
      <div className="relative">
        <div>
          <input
            type="text"
            className={`ps-7 outline-0 border border-gray-600 rounded-xl py-1 w-96  ${
              isDarkmode ? "placeholder:text-white" : "placeholder:text-black"
            }`}
            placeholder="Search Product......."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputvalue(e.target.value)
            }
            value={InputValue}
            ref={InputfousRef}
          />
          <IoSearchSharp
            className={`absolute top-2.5 left-2 ${
              isDarkmode ? "text-white" : "text-gray-600 "
            }`}
          />
        </div>
        {showSearch && (
          <div className={`w-96 max-h-60 h-fit absolute top-9 left-0 bg-gray-100 z-10 overflow-hidden ${showFilterdata?.length > 6 && "overflow-y-scroll" } rounded-md ${isDarkmode && "bg-gray-700"}`} style={{scrollbarColor:`${isDarkmode ? "white #1B2534" : "#212529 #CFD0D1"}`,}}>
            {showFilterdata.length < 1 ? (
              <p className="text-center py-2">Item Not Found</p>
            ) : (
              showFilterdata.map((s: filterDataDetails) => (
                <Link
                  to={`/${s.title}`}
                  className={`flex items-center justify-between px-5 cursor-pointer hover:bg-gray-200  rounded-md 
                    ${isDarkmode && "bg-gray-700 text-white hover:bg-gray-600"}`}
                  key={s.id}
                >
                  <img src={s.thumbnail} alt={s.title} className="size-10" />{" "}
                  <p className={`text-sm`}>{s.title}</p>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
      <div className="flex space-x-10 items-center">
        <NavLink to={"CardDetailList"} className="relative">
          <span className="size-4 rounded-full bg-red-600 text-white absolute -right-3 -top-2 flex justify-center items-center text-[14px]">
            {DataitemCount}
          </span>
          <FaShoppingCart className="cursor-pointer text-2xl" />
        </NavLink>
        <div
          className={`${
            isDarkmode && "hover:text-black"
          }  hover:bg-gray-200 p-2 rounded-full`}
        >
          {isDarkmode ? (
            <IoMoon
              className="text-2xl cursor-pointer"
              onClick={handledarkmode}
            />
          ) : (
            <MdSunny
              className="text-2xl cursor-pointer"
              onClick={handledarkmode}
            />
          )}
        </div>
      </div>
    </header>
  );
}
