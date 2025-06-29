// "use client";
// import { Skeleton } from "@nextui-org/react";
// import React from "react";

// const ProductsLoading = () => {
//   return (
//     <div className="flex mt-[170px]">
//       {/* <div>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
//           {[...Array(3)].map((_, idx) => (
//             <div key={idx} className="space-y-2">
//               <Skeleton className="rounded-lg w-full h-[200px]" />
//               <Skeleton className="h-4 w-3/4 rounded-lg" />
//               <Skeleton className="h-4 w-1/2 rounded-lg" />
//             </div>
//           ))}
//         </div>
//       </div>
//       <div>
//         <div className="hidden lg:block w-[25%] pr-4 space-y-4">
//           <Skeleton className="h-6 w-1/2 rounded-lg" />
//           <Skeleton className="h-4 w-3/4 rounded-lg" />
//           <Skeleton className="h-6 w-1/3 rounded-lg mt-4" />
//           <Skeleton className="h-4 w-1/2 rounded-lg" />
//           <Skeleton className="h-8 w-full rounded-lg mt-4" />
//           <Skeleton className="h-4 w-full rounded-lg" />
//           <Skeleton className="h-4 w-5/6 rounded-lg" />
//         </div>
//       </div> */}
//       {/* <p>Loading</p> */}
//       <Skeleton className="h-[366px] w-full rounded-lg" />
//     </div>
//   );
// };

// export default ProductsLoading;

"use client";
import React from "react";

const ProductsLoading = () => {
  return (
    <div className="lg:mt-40">
      <div className="flex">
        {/* Sidebar skeleton - Only shown on large devices */}
        <div className="hidden lg:block lg:w-[25%] space-y-6 pr-4">
          <div className="h-6 w-1/3 bg-gray-200 animate-pulse rounded" />
          <div className="h-5 w-2/3 bg-gray-200 animate-pulse rounded" />
          <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded" />
          <div className="h-5 w-1/4 bg-gray-200 animate-pulse rounded" />
          <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded" />
        </div>

        {/* Product grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full lg:w-[75%]">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-72 bg-gray-200 animate-pulse rounded-xl"
            >
              <div className="h-40 bg-gray-300 rounded-t-xl" />
              <div className="p-3 space-y-2">
                <div className="h-4 w-3/4 bg-gray-300 rounded" />
                <div className="h-4 w-1/2 bg-gray-300 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination skeleton */}
      <div className="lg:w-[75%] lg:ml-auto  w-full flex justify-center mt-8">
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsLoading;
