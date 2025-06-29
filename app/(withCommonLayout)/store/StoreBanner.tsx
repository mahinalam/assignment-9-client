// "use client";

// import React, { useState } from "react";
// import { Button } from "@nextui-org/button";
// import { Input } from "@nextui-org/input";
// import { IoSearchOutline } from "react-icons/io5";

// const StoreBanner = ({
//   isFollower,
//   storeData,
//   handleFollowShop,
//   hanldeUnfollowShop,
//   followLoading,
//   unFollowLoading,
// }: any) => {
//   const { follower, id, logo, name, description, createdAt } = storeData;

//   const [value, setValue] = useState("");

//   return (
//     <section className="lg:px-2 lg:pt-8 pt-6">
//       <div className="flex items-center justify-between ">
//         <div className="flex justify-between lg:gap-6 gap-4">
//           {/* image */}
//           <section>
//             <div className="relative ">
//               {" "}
//               {/* Adjust width/height based on screen size */}
//               <img alt="Logo" className="lg:size-20 size-16" src={logo} />
//             </div>
//           </section>
//           {/* title section */}
//           <section>
//             <div className="flex flex-col ">
//               <p className="font-bold lg:text-2xl text-lg">{name}</p>
//               <p className="text-gray-500">{description}</p>
//               <div className="flex gap-4 items-center">
//                 <div className="lg:block hidden">
//                   <div className="flex items-center ">
//                     <span>
//                       <svg
//                         className="size-5 mr-2"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="1.5"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </span>
//                     <span>{follower} followers</span>
//                   </div>
//                 </div>
//                 <p className="text-gray-500 sm:text-base text-sm mb-0">
//                   Since {new Date(createdAt).getFullYear()}
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* follow button */}
//           <div className="text-end lg:text-start ">
//             {isFollower ? (
//               <Button
//                 className="text-white bg-primary mt-4 border-primary border-1 hover:bg-primary"
//                 disabled={unFollowLoading}
//                 size="sm"
//                 onClick={() => hanldeUnfollowShop()}
//               >
//                 Unfollow
//               </Button>
//             ) : (
//               <Button
//                 className="text-white bg-primary mt-4 border-primary border-1 hover:bg-primary"
//                 disabled={followLoading}
//                 size="sm"
//                 onClick={() => handleFollowShop()}
//               >
//                 Follow
//               </Button>
//             )}
//           </div>
//         </div>
//         {/* search section */}
//         <section className="lg:block hidden ">
//           <Input
//             className="focus:border-transparent"
//             endContent={
//               <button type="button">
//                 <IoSearchOutline size={20} />
//               </button>
//             }
//             placeholder="Search in store"
//             size="md"
//             variant="bordered"
//           />
//         </section>
//       </div>
//     </section>
//   );
// };

// export default StoreBanner;
"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { IoSearchOutline } from "react-icons/io5";

const StoreBanner = ({
  isFollower,
  storeData,
  handleFollowShop,
  hanldeUnfollowShop,
  followLoading,
  unFollowLoading,
}: any) => {
  const { follower, id, logo, name, description, createdAt } = storeData;

  const [value, setValue] = useState("");

  return (
    <section className="w-full py-6 md:py-10 border-b">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-10 px-4 md:px-8">
        {/* Left: Shop Info */}
        <div className="flex gap-4 md:gap-6 items-start w-full lg:w-auto">
          {/* Shop Logo */}
          <div className="shrink-0">
            <img
              alt="Logo"
              className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full border shadow-sm"
              src={logo}
            />
          </div>

          {/* Shop Details */}
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="font-bold text-xl md:text-2xl">{name}</h1>
              <p className="text-sm md:text-base text-gray-500">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-600">
              <div className="flex items-center gap-1">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{follower} followers</span>
              </div>
              <span>•</span>
              <p>Since {new Date(createdAt).getFullYear()}</p>
            </div>

            {/* Follow / Unfollow Button */}
            <div className="mt-2">
              {isFollower ? (
                <Button
                  className="text-white bg-primary rounded-md text-sm px-4 py-1"
                  disabled={unFollowLoading}
                  size="sm"
                  onClick={hanldeUnfollowShop}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  className="text-white bg-primary rounded-md text-sm px-4 py-1"
                  disabled={followLoading}
                  size="sm"
                  onClick={handleFollowShop}
                >
                  Follow
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Search Input */}
        <div className="w-full lg:w-1/3">
          <Input
            classNames={{
              inputWrapper: "border-gray-300",
            }}
            endContent={
              <button type="button">
                <IoSearchOutline size={20} />
              </button>
            }
            placeholder="Search in store"
            radius="sm"
            variant="bordered"
          />
        </div>
      </div>
    </section>
  );
};

export default StoreBanner;
