// import Rate from "rc-rate";
// import React from "react";
// import "rc-rate/assets/index.css";
// // import ProgresComponent from "./ProgresComponent";
// import { Progress } from "@nextui-org/react";

// const AvgRating = ({ reviewData }: any) => {
//   return (
//     <div>
//       <div>
//         <section>
//           <p className="font-semibold p-3">
//             Ratings & Reviews of Premium Head Cover Factory Direct Supply Set A
//             Arab scarf Soft Cotton Cloth Comfortable Winter Fabric Haji R
//           </p>
//         </section>
//         <section className="flex items-center">
//           <div>
//             <p>
//               <span className="text-5xl text-[#212121]">4.6</span>
//               <span className="text-[32px] text-[#9e9e9e]">/5</span>
//             </p>
//             <p>
//               {/* TODO: make progress button */}
//               <Rate
//                 disabled
//                 allowHalf={false}
//                 className="text-[#FACA51] text-xl "
//                 count={5}
//                 value={5}
//                 style={{ fontSize: "40px" }}
//               />
//             </p>
//             <p className="text-[#757575] text-xs">205 Ratings</p>
//           </div>
//           {/* <div></div> */}
//           <div className="">
//             <div>
//               {" "}
//               <Rate
//                 disabled
//                 allowHalf={false}
//                 className="text-[#FACA51] text-xl "
//                 count={5}
//                 value={5}
//               />
//             </div>
//             <div>
//               {" "}
//               <Rate
//                 disabled
//                 allowHalf={false}
//                 className="text-[#FACA51] text-xl "
//                 count={5}
//                 value={5}
//               />
//             </div>
//             <div>
//               {" "}
//               <Rate
//                 disabled
//                 allowHalf={false}
//                 className="text-[#FACA51] text-xl "
//                 count={5}
//                 value={5}
//               />
//             </div>
//             <div>
//               {" "}
//               <Rate
//                 disabled
//                 allowHalf={false}
//                 className="text-[#FACA51] text-xl "
//                 count={5}
//                 value={5}
//               />
//             </div>
//             <div>
//               {" "}
//               <Rate
//                 disabled
//                 allowHalf={false}
//                 className="text-[#FACA51] text-xl "
//                 count={5}
//                 value={5}
//               />
//             </div>
//           </div>
//           <div>
//             <Progress
//               className="max-w-md"
//               color="warning"
//               // formatOptions={{ style: "currency", currency: "ARS" }}
//               // label="Monthly expenses"
//               maxValue={10000}
//               showValueLabel={true}
//               size="md"
//               value={400}
//             />
//             {/* <ProgresComponent value={20} maxValue={1000} /> */}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AvgRating;

import Rate from "rc-rate";
import React from "react";
import "rc-rate/assets/index.css";
import { Progress } from "@nextui-org/react";

const ReviewProgress = ({ reviewData, productName }: any) => {
  const totalRatings = reviewData.reviewCounts.reduce(
    (sum: number, countObj: { _count: number }) => sum + countObj._count,
    0
  );

  const calculatePercentage = (count: number) =>
    totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0;

  return (
    <div>
      <section>
        <p className="font-semibold ">Ratings & Reviews of {productName}</p>
      </section>
      <section className="flex items-center gap-8 pt-4">
        {/* Average Rating Section */}
        <div className="w-[30%]">
          <p>
            <span className="text-5xl text-[#212121]">
              {reviewData.averageRating.toFixed(1)}
            </span>
            <span className="text-[32px] text-[#9e9e9e]">/5</span>
          </p>
          <Rate
            disabled
            allowHalf={true}
            className="text-[#FACA51] text-xl"
            count={5}
            style={{ fontSize: "40px", width: "100%" }}
            value={Math.round(reviewData.averageRating)}
          />
          <p className="text-[#757575] text-sm">{totalRatings} Ratings</p>
        </div>

        {/* Progress Bars */}
        <div className="w-full">
          {[5, 4, 3, 2, 1].map((star) => {
            const count =
              reviewData.reviewCounts.find(
                (r: { rating: number; _count: number }) => r.rating === star
              )?._count || 0;
            const percentage = calculatePercentage(count);

            return (
              <div key={star} className="flex items-center gap-4 mb-2">
                <Rate
                  disabled
                  allowHalf={false}
                  className="text-[#FACA51]"
                  count={5}
                  style={{ fontSize: "20px" }}
                  value={star}
                />
                <Progress
                  className="w-[25%]"
                  color="warning"
                  maxValue={100}
                  size="md"
                  value={percentage}
                />
                <span className="text-sm text-[#757575]">{count}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ReviewProgress;
