import React from "react";

const ShopInfo = ({
  shopInfo,
  isEditShopButtonOpen,
  setIsEditShopButtonOpen,
  hanldeUpdateShopInfo,
  shopImage,
  setShopImage,
}: any) => {
  const { logo, name, description } = shopInfo;
  return (
    <div>
      {" "}
      <section className="grid  grid-cols-1 lg:grid-cols-2 border-b-1  pt-8">
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
              <img className="size-[100px]" src={logo} alt="" />
            </div>
            <div className="">
              <p className="mb-2 lg:mt-0 mt-6 text-sm font-medium">
                Upload Image
              </p>
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
            disabled={!isEditShopButtonOpen}
            onChange={(e) => setShopImage(e.target?.files?.[0])}
            type="file"
            className="w-full hidden mt-1 lg:mb-8 rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
            name="image"
            id="image"
            placeholder="Jhon Deo"
          ></input>
          {shopImage && (
            <div className="relative flex items-center gap-2 rounded-md border border-athens-gray-200 bg-white p-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-athens-gray-100">
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
                  className="lucide lucide-image size-4 text-athens-gray-800"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <circle cx="9" cy="9" r="2"></circle>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                </svg>
              </div>
              <div>
                <h6 className="!text-sm">{shopImage?.name}</h6>
                <p className="!text-xs !text-athens-gray-500">{`${shopImage ? Number(shopImage?.size) / 1000 : 0.0} KB`}</p>
              </div>
              <div className="absolute inset-y-0 right-3 flex items-center">
                <button onClick={() => setShopImage(undefined)}>
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
                    className="lucide lucide-trash2 size-4 text-athens-gray-500 transition-all hover:text-athens-gray-800"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" x2="10" y1="11" y2="17"></line>
                    <line x1="14" x2="14" y1="11" y2="17"></line>
                  </svg>
                </button>
              </div>
            </div>
          )}
          <div className="lg:mt-4 mt-5 mb-6 lg:mb-0 ">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="name"
            >
              Shop Name
            </label>
            <input
              defaultValue={name}
              type="text"
              className="w-full mt-1 lg:mb-8 rounded-md border border-input bg-transparent py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
              name="name"
              id="name"
              placeholder="Jhon Deo"
              readOnly={!isEditShopButtonOpen}
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
              defaultValue={description}
              className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-athens-gray-950 outline-none !ring-0 focus:ring-0"
              name="bio"
              id="bio"
              placeholder="Details about shop."
              rows={7}
              readOnly={!isEditShopButtonOpen}
            ></textarea>
          </div>
        </div>
      </section>
      <div className="flex md:flex-row flex-col items-center gap-2 md:mt-2 mt-10 ">
        {isEditShopButtonOpen && (
          <button
            onClick={() => setIsEditShopButtonOpen(false)}
            className="bg-gray-200 md:px-[60px] md:py-[10px] py-3 w-full md:w-auto  rounded-[2px] "
          >
            Cancel
          </button>
        )}
        {!isEditShopButtonOpen ? (
          <>
            <button
              onClick={() => setIsEditShopButtonOpen(true)}
              className="bg-[#1A9CB7] md:px-[60px] md:py-[10px] py-3 w-full md:w-auto rounded-[2px] text-white"
            >
              Edit Shop
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                isEditShopButtonOpen();
              }}
              className="bg-[#1A9CB7] md:px-[60px] md:py-[10px] py-3 w-full md:w-auto rounded-[2px] text-white"
            >
              Save Changes
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopInfo;
