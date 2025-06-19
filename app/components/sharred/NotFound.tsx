"use client";

import { useSearchParams } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";

const NotFound = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("search");

  console.log("query", query);

  return (
    <div className=" w-full h-full">
      {/* title section */}
      {/* desktop view */}
      <div className="lg:block hidden">
        <div className="">
          <p className="lg:text-xl font-normal">{query}</p>
          <p className="text-[#666666] text-sm">
            0 items found for {`"${query}"`}
          </p>
        </div>
        <div className="text-center w-full flex flex-col justify-between items-center">
          <h3 className="text-2xl text-title">Search No Result</h3>
          <p className="text-[#757575] mt-[10px] mb-7">
            We're sorry. We cannot find any matches for your search term.
          </p>

          <IoSearchOutline className="text-[#757575]" size={90} />
        </div>
      </div>

      {/* mobile view */}
      <div className="block lg:hidden h-full w-full bg-white">
        <div className="flex  flex-col items-center justify-center w-full h-full">
          <div>
            <IoSearchOutline className="text-[#757575]" size={70} />
          </div>
          <p className="mt-6 text-lg font-bold text-center">We're sorry.</p>
          <p className="text-[13px] text-center">
            We cannot find any matches for your search term.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
