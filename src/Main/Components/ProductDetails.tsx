import { Link, useOutletContext, useParams } from "react-router";
import { useSearchProductdataQuery } from "../apiSlice";
import { FaMinus, FaPlus, FaShoppingCart, FaStar } from "react-icons/fa";
import { TbTruckDelivery, TbTruckReturn } from "react-icons/tb";
import { MdOutlineVerifiedUser } from "react-icons/md";
import Reviews from "./Revies";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../App/store";
import { addItem } from "../ProductSlice";
import { ProductData } from "../../Header/Header";

export interface ProductDetailsProps {
  id: string;
  title: string;
  images: string[];
  thumbnail: string;
  rating: number;
  price: number;
  discountPercentage: number;
  stock: number;
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  description: string;
  brand: string;
  availabilityStatus?: string;
  reviews: {
    rating: number;
    comment: string;
    date: Date;
    reviewerName: string;
  }[];
}

export default function ProductDetails() {
  const contextDarkmode = useOutletContext();
  const { title } = useParams();
  const { data, isLoading, isError } = useSearchProductdataQuery(title);
  const [Ismousein, setismousein] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState({ X: 0, Y: 0 });
  const divRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [naturalDimensions, setNaturalDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [count, setCount] = useState<number>(1);
  const Dataselect = useSelector(
    (state: Rootstate) => state.productdata.ProductData
  );

  const Dispatch = useDispatch();
  const width = divRef.current?.getBoundingClientRect().width || 0;
  const height = divRef.current?.getBoundingClientRect().height || 0;

  const lensWidth = 500;
  const lensHeight = 296;
  const zoomScale = 1.5;
  const zoomWindowWidth = lensWidth * zoomScale;
  const zoomWindowHeight = lensHeight * zoomScale;

  useEffect(() => {
    const filterData: ProductData[] = Dataselect.filter(
      (d) => d.title === title
    );
    setCount(filterData[0]?.quantity || 1);
  }, [Dataselect, title]);
  const handleImageLoad = () => {
    if (imgRef.current) {
      setNaturalDimensions({
        width: imgRef.current.naturalWidth,
        height: imgRef.current.naturalHeight,
      });
    }
  };
  const handleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const containerRect = divRef.current?.getBoundingClientRect();
    if (containerRect) {
      let X = e.clientX - containerRect.left;
      let Y = e.clientY - containerRect.top;

      const lensWidth = 160;
      const lensHeight = 96;

      X = Math.max(
        lensWidth / 2,
        Math.min(X, containerRect.width - lensWidth / 2)
      );
      Y = Math.max(
        lensHeight / 2,
        Math.min(Y, containerRect.height - lensHeight / 2)
      );

      setMousePosition({ X, Y });
    }
  };

  const originalX = (mousePosition.X / width) * naturalDimensions.width;
  const originalY = (mousePosition.Y / height) * naturalDimensions.height;
  const px = originalX * zoomScale;
  const py = originalY * zoomScale;
  const zoomX = zoomWindowWidth / 2 - px;
  const zoomY = zoomWindowHeight / 2 - py;

  const bgWidth = naturalDimensions.width * zoomScale;
  const bgheight = naturalDimensions.height * zoomScale;

  const minX = zoomWindowWidth - bgWidth;
  const minY = zoomWindowHeight - bgheight;
   
  const adjustedZoomX = Math.min(0,Math.max(zoomX,minX));
  const adjustedZoomY = Math.min(0,Math.max(zoomY,minY));
  return (
    <div className="p-5">
      <div>
        <Link
          to={"/"}
          type="button"
          className="py-2 px-5 bg-black rounded-md text-white cursor-pointer"
        >
          Back
        </Link>
      </div>
      {isLoading && (
        <div className="text-5xl font-bold text-center">Loading...</div>
      )}
      {isError && (
        <div className="text-5xl font-bold text-center">Product Not Found</div>
      )}
      {data &&
        data.products.map(
          ({
            id,
            title,
            images,
            thumbnail,
            rating,
            price,
            discountPercentage,
            stock,
            warrantyInformation,
            shippingInformation,
            returnPolicy,
            description,
            brand,
            reviews,
          }: ProductDetailsProps) => {
            const dis = Math.ceil(discountPercentage);
            const totalvalue: number =
              dis < 100 ? (price * 100) / (100 - dis) : price;
            return (
              <div className="grid grid-cols-12 mt-5 justify-around" key={id}>
                <div className="col-span-5">
                  {/* <div className="grid grid-cols-12 space-x-2"> */}
                    {/* <div className="col-span-2 space-y-2">
                      {[...Array(images.length)].map((_, i) => (
                        <div
                          className="size-24 border border-gray-500 rounded-sm cursor-pointer space-x-5 grid grid-cols-1  items-center"
                          key={i}
                        >
                          <img
                            src={thumbnail}
                            alt={title}
                            className="opacity-80 hover:opacity-100"
                          />
                        </div>
                      ))}
                    </div> */}
                    <div
                      className="border border-gray-300 rounded-md w-full h-fit relative col-span-12"
                      ref={divRef}
                      onMouseEnter={() => setismousein(true)}
                      onMouseLeave={() => setismousein(false)}
                      onMouseMove={handleZoom}
                    >
                      <img
                        ref={imgRef}
                        src={images[0]}
                        alt={title}
                        className="w-full h-[30rem] object-contain"
                        onLoad={handleImageLoad}
                      />

                      {Ismousein && (
                        <>
                          <div
                            className={`bg-[url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMiIgaGVpZ2h0PSIyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZmlsbC1vcGFjaXR5PSIuMDUiIGZpbGw9IiNGRkYiIGQ9Ik0wIDBoMnYySDB6Ii8+PHBhdGggZD0iTTAgMGgxdjFIMHoiIGZpbGw9IiM4REFDREEiLz48L2c+PC9zdmc+)] absolute pointer-events-none w-40 h-24`}
                            style={{
                              top: `${mousePosition.Y}px`,
                              left: `${mousePosition.X}px`,
                              transform: "translate(-50%, -50%)",
                            }}
                          ></div>
                          <div
                            className={`absolute left-[105%] top-0 w-[700px] h-[500px] border-2 border-gray-300 overflow-hidden hidden lg:block ${contextDarkmode ? "bg-gray-900" : "bg-white"}`}
                            style={{
                              width: `${zoomWindowWidth}px`,
                              height: `${zoomWindowHeight}px`,
                              backgroundImage: `url(${images[0]})`,
                              backgroundSize: `${bgWidth}px ${bgheight}px`,
                              backgroundPosition: `${adjustedZoomX}px ${adjustedZoomY}px`,
                              backgroundRepeat: "no-repeat",
                            }}
                          ></div>
                        </>
                      )}
                    </div>
                  {/* </div> */}
                </div>
                <div className="col-span-7 px-10 space-y-2">
                  {Ismousein ? (
                    <div>Hello</div>
                  ) : (
                    <div>
                      <div className="space-y-3">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-[14px] font-semibold text-gray-500">
                          Brand: {brand}
                        </p>
                        <p className="bg-green-700 w-fit text-white p-1 rounded-md flex items-center">
                          {rating}
                          <FaStar className="ms-1" />
                        </p>
                        <p className="text-green-600 font-bold">
                          Extra ${(totalvalue - price).toFixed(2)} off{" "}
                          <span className="text-red-500 text-[14px] ms-4">
                            {stock < 1
                              ? ""
                              : stock < 10
                              ? `Stock ${stock} left`
                              : ""}
                          </span>
                        </p>
                        <div className="flex items-center space-x-4">
                          <p className="font-bold text-2xl">${price}</p>
                          <p className="line-through text-gray-400 text-[18px] font-semibold">
                            ${totalvalue.toFixed(2)}
                          </p>
                          <p className="text-green-700 font-bold">
                            {Math.ceil(discountPercentage)}% off
                          </p>
                        </div>
                        <div className="flex space-x-5">
                          <div>
                            <TbTruckReturn
                              className="text-3xl text-yellow-400/80 justify-self-center"
                              title="Return Product"
                            />
                            <p className="text-[14px] w-24 text-center capitalize">
                              {returnPolicy}
                            </p>
                          </div>
                          <div>
                            <TbTruckDelivery
                              className="text-3xl text-yellow-400/80 justify-self-center"
                              title="Shipping Info"
                            />
                            <p className="text-[14px] w-24 text-center capitalize">
                              {shippingInformation}
                            </p>
                          </div>
                          <div>
                            <MdOutlineVerifiedUser
                              className="text-3xl text-yellow-400/80 justify-self-center"
                              title="Warranty Info"
                            />
                            <p className="text-[14px] w-24 text-center capitalize">
                              {warrantyInformation}
                            </p>
                          </div>
                        </div>
                        <div className="mt-5">
                          {/* <h2 className="text-2xl font-bold">About Item</h2> */}
                          <p> {description}</p>
                        </div>
                        <div className="flex items-center space-x-20 my-5">
                          <div className="flex border-2 border-zinc-500 h-10 rounded-md overflow-hidden">
                            <button
                              type="button"
                              className="border-r-2 border-zinc-500 w-10 cursor-pointer hover:bg-yellow-500 justify-items-center"
                              onClick={() =>
                                setCount((prev) => {
                                  if (prev <= 1) {
                                    return 1;
                                  } else {
                                    return prev - 1;
                                  }
                                })
                              }
                            >
                              <FaMinus />
                            </button>
                            <p className="w-20 text-center self-center font-semibold text-2xl">
                              {count}
                            </p>
                            <button
                              type="button"
                              className="border-l-2 border-zinc-500 w-10 cursor-pointer hover:bg-yellow-500 justify-items-center"
                              onClick={() => setCount((prev) => prev + 1)}
                            >
                              <FaPlus />
                            </button>
                          </div>
                          <button
                            type="button"
                            className="px-10 py-2 bg-amber-600 rounded-md text-white cursor-pointer font-bold flex items-center"
                            onClick={() => {
                              Dispatch(
                                addItem({
                                  id: id,
                                  title: title,
                                  thumbnail: thumbnail,
                                  price: price,
                                  quantity: count,
                                })
                              );
                            }}
                          >
                            <FaShoppingCart className="me-3" /> Add Card
                          </button>
                        </div>
                      </div>
                      <div className="mt-24">
                        <h2 className="text-2xl font-bold mb-10">
                          Raring & Reviews
                        </h2>
                        {reviews.map(
                          ({ rating, comment, date, reviewerName }) => (
                            <Reviews
                              rating={rating}
                              comment={comment}
                              date={date}
                              reviewerName={reviewerName}
                              key={crypto.randomUUID()}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          }
        )}
    </div>
  );
}
