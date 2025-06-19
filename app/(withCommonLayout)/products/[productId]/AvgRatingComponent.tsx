import "rc-rate/assets/index.css";
import Rate from "rc-rate";
import "./index.css";

export default function RatingProgress({ totalReview, avgReview }: any) {
  return (
    <div className="space-y-4 lg:mt-8 mt-6 border-border border-b-1 lg:pb-8">
      <div>
        <p className="font-bold lg:text-xl text-medium">
          {totalReview} reviews for mahin
        </p>
      </div>

      <div className="flex  lg:items-center gap-4">
        <span className="lg:text-[72px] text-5xl font-medium">{avgReview}</span>

        <div className="lg:flex-shrink-0  rate">
          <Rate
            disabled
            allowHalf={false}
            className="text-[#FACA51] text-2xl "
            count={5}
            style={{ fontSize: "32px" }}
            value={5}
          />
          <p className="lg:text-sm  text-xs">
            Average of{" "}
            <span className="font-semibold lg:text-sm text-xs ">
              {totalReview} reviews
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
