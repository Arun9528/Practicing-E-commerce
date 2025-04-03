import { FaStar, FaUserCircle } from "react-icons/fa";
export interface ReviewsProp {
    rating: number;
    comment: string;
    date: Date;
    reviewerName: string;
  }
export default function Reviews({rating, comment, date, reviewerName}:ReviewsProp) {
    const dateString = new Date(date);
  return (
    <div>
                <div className="space-y-2">
                  <p className="flex items-center">
                    <FaUserCircle className="me-2 text-gray-400 text-2xl" /> {reviewerName}
                  </p>
                  <p className="flex space-x-2">
                    {[...Array(rating)].map((_, i) => (
                      <FaStar color="yellow" key={i} />
                    ))}
                  </p>
                  <p> Reviewed in India  on {dateString.toLocaleString()}</p>
                  <p className="py-5">{comment}</p>
                </div>
            
     
    </div>
  );
}
