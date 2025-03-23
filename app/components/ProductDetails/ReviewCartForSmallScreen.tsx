import Rate from "rc-rate";
import React from "react";
import moment from "moment";

const ReviewCartForSmallScreen = ({ reviewData }: any) => {
  const { comment, createdAt, images, rating, user } = reviewData;
  return (
    <div>
      {/* name & date section */}
      <section className="flex items-center justify-between">
        <div className="">
          <p className="text-[10px]">
            {user?.name} - {moment(createdAt).format("DD MMM YYYY")}
          </p>
        </div>
        <div>
          <Rate allowHalf={false} className="" count={5} value={rating} />
        </div>
      </section>
      {/* comment section */}
      <p className="text-title text-xs">{comment}</p>
      {/* images section */}
      <div>
        {images.map((image: any) => (
          <img
            alt="review"
            className="md:size-[100px] size-[60px]"
            src={image}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewCartForSmallScreen;
