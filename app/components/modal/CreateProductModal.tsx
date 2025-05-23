"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { useState } from "react";
import { useSelector } from "react-redux";

import GTInput from "../form/GTInput";
import GTForm from "../form/GTForm";

import { useGetCartQuantityQuery } from "@/app/redux/features/cart/cartApi";
import { RootState } from "@/app/redux/store";
import GTSelect from "../form/GTSelect";
import { useGetAllCategoriesQuery } from "@/app/redux/features/category/categoryApi";
import { ICategory } from "@/types";

export default function CreateProductModal({
  isOpen,
  onOpenChange,
  setCreateProductImageFiles,
  createImageFiles,
  handleDeleteCreateProducts,
  handleCreateProduct,
  createProductLoading,
  createProductLoadingName,
}) {
  const { data: categoriesData, isLoading: categoriesDataLoading } =
    useGetAllCategoriesQuery(null);

  if (categoriesDataLoading) {
    return;
  }

  const categoriesOption = categoriesData?.data?.data?.map(
    (item: ICategory) => ({
      key: item.id,
      label: item.name,
    })
  );

  //   console.log(data);
  return (
    <>
      <Modal
        className="w-full"
        isOpen={isOpen}
        size="3xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="w-full">
                  <div>
                    <div className="">
                      <div className=" p-5 bg-white">
                        <div>
                          <p className=" text-[18px] font-bold">
                            Create Product
                          </p>
                        </div>
                        <GTForm onSubmit={handleCreateProduct}>
                          <div className="py-3 flex gap-2">
                            <GTInput
                              label="Product Name"
                              name="name"
                              type="text"
                            />
                            <GTInput
                              label="Product Price"
                              name="price"
                              type="number"
                            />
                          </div>
                          {/* <div className="py-3">
                            <GTInput
                              label="Shop Name"
                              name="shopId"
                              type="text"
                            />
                          </div> */}

                          <div className="py-3 flex gap-2">
                            <GTInput
                              label="Stock Quantity"
                              name="stock"
                              type="number"
                            />
                            <GTInput
                              label="Product Discount"
                              name="discount"
                              type="number"
                            />
                          </div>
                          <div className="py-3">
                            <GTSelect
                              label="Category"
                              name="categoryId"
                              options={categoriesOption}
                              type="text"
                            />
                          </div>
                          {/* <div className="py-3">
                <input
                  onChange={(e) => setLogoImage(e.target.files![0])}
                  type="file"
                  name="logo"
                />
              </div> */}
                          {/* <div className="min-w-fit flex-1 mt-12">
                            <input
                              multiple
                              className="hidden"
                              id="image"
                              type="file"
                              //   onChange={(e) => handleImageChange(e)}
                            />
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
                          </div> */}
                          {/* {imagePreviews.length > 0 && (
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
                          )} */}
                          <div>
                            <p className="mb-2 lg:mt-0  text-sm font-medium">
                              Upload Image
                            </p>
                            <label
                              htmlFor="image"
                              className={`flex cursor-pointer items-center gap-3 rounded border border-dashed border-athens-gray-200 bg-white p-3 transition-all`}
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
                                  Click to browse JPG,JPEG or PNG formats.
                                </small>
                              </div>
                            </label>
                            <input
                              //   disabled={!isEditProfileOpen}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setCreateProductImageFiles(
                                    (prevImages: File[]) => [
                                      ...prevImages,
                                      file,
                                    ]
                                  );
                                }
                              }}
                              type="file"
                              className="w-full  hidden mt-1 lg:mb-8 rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
                              name="image"
                              id="image"
                            ></input>

                            {createImageFiles?.length > 0 &&
                              createImageFiles.map((imageFile: File) => (
                                <div className="mb-2 relative flex items-center gap-2 rounded-md border border-athens-gray-200 bg-white p-3">
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
                                      <rect
                                        width="18"
                                        height="18"
                                        x="3"
                                        y="3"
                                        rx="2"
                                        ry="2"
                                      ></rect>
                                      <circle cx="9" cy="9" r="2"></circle>
                                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                                    </svg>
                                  </div>
                                  <div>
                                    <h6 className="!text-sm">
                                      {imageFile?.name}
                                    </h6>
                                    <p className="!text-xs !text-athens-gray-500">{`${imageFile ? Number(imageFile?.size) / 1000 : 0.0} KB`}</p>
                                  </div>
                                  <div className="absolute inset-y-0 right-3 flex items-center">
                                    <button
                                      onClick={() =>
                                        handleDeleteCreateProducts(imageFile)
                                      }
                                    >
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
                                        <line
                                          x1="10"
                                          x2="10"
                                          y1="11"
                                          y2="17"
                                        ></line>
                                        <line
                                          x1="14"
                                          x2="14"
                                          y1="11"
                                          y2="17"
                                        ></line>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              ))}
                          </div>
                          <Button
                            className="my-3 w-full rounded-md bg-primary  font-semibold text-white"
                            isLoading={createProductLoading}
                            size="lg"
                            type="submit"
                          >
                            {createProductLoadingName}
                          </Button>
                        </GTForm>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
