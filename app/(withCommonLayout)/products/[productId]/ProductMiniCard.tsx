import React from "react";
import Image from "next/image";

const ProductCard = ({
  handleCurrentImage,
  currentImage,
  image,
}: {
  handleCurrentImage: any;
  image: string;
  currentImage: string;
}) => {
  return (
    // <div>
    <div
      className={`${currentImage === image ? "border-1 border-primary" : ""} size-[80px] border-1 cursor-pointer`}
      onMouseEnter={() => handleCurrentImage(image)}
    >
      <Image
        alt=""
        className="w-full h-full"
        height={80}
        src={image}
        width={80}
      />
    </div>
  );
};

export default ProductCard;
