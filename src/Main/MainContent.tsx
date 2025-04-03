import { useEffect } from "react";
import { useGetProductdataQuery } from "./apiSlice";
import Cards, { CardsProps } from "./Components/Cards";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../App/store";
import { StoreAlldata } from "../SideBar/FilterSlice";

export default function MainContent() {
  const { data, isError, isLoading } = useGetProductdataQuery(194);
  const filteredData = useSelector(
    (state: Rootstate) => state.filterdata.filterData
  );
  const filterDatas = useDispatch();

  useEffect(() => {
    if (data) {
      filterDatas(StoreAlldata(data.products));
    }
  }, [data, filterDatas]);
  return (
    <div className={`col-span-10 grid ${filteredData.length === 0 ? "lg:grid-cols-1" : "lg:grid-cols-3"} md:grid-cols-2 sm:grid-cols-1 gap-10 w-full justify-center p-8`}>
      {isLoading && <div className="text-5xl font-bold text-center mt-20">Loading...</div>}
      {isError && <div className="text-5xl text-center mt-20 font-bold">Something Went Wrong.</div>}
      {!isLoading && !isError && filteredData.length === 0 ? (
        <div className="text-5xl font-bold text-center mt-20">Product not Found</div>
      ) : (
        filteredData
          .flat()
          .map(
            ({ 
              id,
              title,
              price,
              thumbnail,
              discountPercentage,
              rating,
              availabilityStatus,
            }: CardsProps) => (
              <Cards
                key={id}
                title={title}
                price={price}
                thumbnail={thumbnail}
                discountPercentage={discountPercentage}
                rating={rating}
                availabilityStatus={availabilityStatus}
              />
            )
          )
      )}
    </div>
  );
}
