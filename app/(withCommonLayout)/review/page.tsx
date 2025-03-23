// "use client";
// import React, { useState } from "react";
// import { Input, Textarea, Button } from "@nextui-org/react";
// import Rate from "rc-rate";

// const ReviewPage = () => {
//   const [reviewData, setReviewData] = useState({
//     name: "",
//     email: "",
//     rating: 0,
//     comment: "",
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setReviewData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleRatingChange = (value: number) => {
//     setReviewData((prev) => ({ ...prev, rating: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Review Submitted:", reviewData);
//     alert("Review submitted successfully!");
//     // You can send the data to your API here
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
//         <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
//           Submit Your Review
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Name Input */}
//           <Input
//             label="Name"
//             placeholder="Enter your name"
//             name="name"
//             value={reviewData.name}
//             onChange={handleInputChange}
//             required
//           />

//           {/* Email Input */}
//           <Input
//             label="Email"
//             placeholder="Enter your email"
//             name="email"
//             type="email"
//             value={reviewData.email}
//             onChange={handleInputChange}
//             required
//           />

//           {/* Rating */}
//           <div className="flex items-center justify-between">
//             <label className="text-gray-700 font-medium">Rating:</label>
//             <Rate
//               value={reviewData.rating}
//               onChange={(value) => handleRatingChange(value)}
//               allowClear
//             />
//           </div>

//           {/* Comment Textarea */}
//           <Textarea
//             label="Comment"
//             placeholder="Write your review here..."
//             name="comment"
//             value={reviewData.comment}
//             onChange={handleInputChange}
//             minRows={4}
//             required
//           />

//           {/* Submit Button */}
//           <Button
//             type="submit"
//             className="w-full bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Submit Review
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ReviewPage;

"use client";

import React, { ChangeEvent, useState } from "react";
import { Input, Textarea, Button } from "@nextui-org/react";
import Rate from "rc-rate";
import "rc-rate/assets/index.css"; // Import rc-rate styles

const ReviewPage = () => {
  const [review, setReview] = useState(0);

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRatingChange = (value: number) => {
    setReview(() => value);
  };

  console.log("review", review);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log("Review Submitted:", reviewData);

    const updatedReview = {
      comment: e.target.comment.value,
    };

    const formData = new FormData();

    // formData.append("data", JSON.stringify(productData));
    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }

    // console.log("formdata", reviewData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Submit Your Review
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <Input
              fullWidth
              required
              name="name"
              // value={review}
              // onChange={handleInputChange}
              label="Name"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Input */}
          <div>
            <Input
              fullWidth
              required
              label="Email"
              type="email"
              // value={reviewData.email}
              // onChange={handleInputChange}
              name="email"
              placeholder="Enter your email"
            />
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium text-sm">Rating:</span>
            <Rate
              allowClear
              className="text-xl"
              style={{ fontSize: "30px" }}
              value={review}
              onChange={(value) => handleRatingChange(value)}
            />
          </div>

          {/* Comment Textarea */}
          <div>
            <Textarea
              fullWidth
              required
              name="comment"
              // value={reviewData.comment}
              // onChange={handleInputChange}
              label="Comment"
              minRows={4}
              placeholder="Write your review here..."
            />
          </div>
          <div className="min-w-fit flex-1 mt-12">
            <label
              className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200  shadow-sm transition-all duration-100 hover:border-default-400"
              htmlFor="image"
            >
              <span className=""> Upload image</span>
            </label>
            <input
              multiple
              className="hidden"
              id="image"
              type="file"
              onChange={(e) => handleImageChange(e)}
            />
          </div>

          {imagePreviews.length > 0 && (
            <div className="flex gap-5 my-5 flex-wrap">
              {imagePreviews.map((imageDataUrl) => (
                <div
                  key={imageDataUrl}
                  className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                >
                  <img
                    alt="item"
                    className="h-full w-full object-cover object-center rounded-md"
                    src={imageDataUrl}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <Button className="w-full bg-[#F57224] text-white " type="submit">
            Submit Review
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;
