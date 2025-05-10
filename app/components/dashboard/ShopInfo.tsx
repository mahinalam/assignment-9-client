import React from "react";

const ShopInfo = ({ shopInfo }) => {
  return (
    <div>
      {" "}
      <section className="grid  grid-cols-1 lg:grid-cols-2 border-b-1 lg:pt-16 pt-8">
        <div>
          <p className="lg:text-xl font-semibold">Shop Info</p>
          <p className="text-[#737682] pt-3 lg:mt-1">
            Ensure the shop logo is updated and under 1MB in size.
          </p>
        </div>
        <div className=" ">
          <div className="lg:flex  items-center gap-4 ">
            {/* image section */}
            <div className="lg:pt-0 pt-8">
              <img className="size-[100px]" src={shopInfo?.logo} alt="" />
            </div>
            <div className="">
              <p className="mb-2 lg:mt-0 mt-6">Upload Image</p>
              <label
                htmlFor="image"
                className="flex cursor-pointer items-center gap-3 rounded border border-dashed border-athens-gray-200 bg-white p-3 transition-all hover:bg-athens-gray-50/10"
              >
                <div className="flex size-16 items-center justify-center rounded-full bg-athens-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-folder-open-dot size-5 text-athens-gray-500"
                  >
                    <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"></path>
                    <circle cx="14" cy="15" r="1"></circle>
                  </svg>
                </div>
                <div>
                  <h5 className="font-semibold text-athens-gray-600">
                    Upload Your Files
                  </h5>
                  <small className="text-sm text-athens-gray-400">
                    Click to browse JPG or PNG formats.
                  </small>
                </div>
              </label>
            </div>
          </div>
          <input
            type="file"
            className="w-full hidden mt-1 lg:mb-8 rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
            name="image"
            id="image"
            placeholder="Jhon Deo"
          ></input>
          <div className="lg:mt-4 mt-5 mb-6 lg:mb-0 ">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="name"
            >
              Shop Name
            </label>
            <input
              defaultValue={shopInfo?.name}
              type="text"
              className="w-full mt-1 lg:mb-8 rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
              name="name"
              id="name"
              placeholder="Jhon Deo"
            ></input>
          </div>
        </div>
      </section>
      {/* others section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 mt-8 ">
        <div>
          <p className="lg:text-xl font-semibold">Others</p>
          <p className="text-[#737682] mt-1">Change your shop description</p>
        </div>
        <div>
          <div className="lg:mt-4 mt-5  ">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pb-1"
              htmlFor="email"
            >
              Shop Description
            </label>
            <textarea
              defaultValue={shopInfo?.description}
              className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-athens-gray-950 outline-none !ring-0 focus:ring-0"
              name="bio"
              id="bio"
              placeholder="Details about shop."
              rows={7}
            ></textarea>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopInfo;
