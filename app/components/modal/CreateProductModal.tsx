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

export default function CreateProductModal({ isOpen, onOpenChange }) {
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

  //   console.log("cartQuantity", cartQuantity);
  const onSubmit = (data: any) => {
    // const payload = {
    //   customerName: data.name,
    //   customerEmail: data.email,
    //   customerPhone: data.phoneNumber,
    //   customerShippingAddress: data.address,
    // };
  };

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
                        <GTForm onSubmit={onSubmit}>
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
                          <div className="min-w-fit flex-1 mt-12">
                            {/* <label
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
                              //   onChange={(e) => handleImageChange(e)}
                            /> */}
                            <p className="mb-2 lg:mt-0 mt-6">Upload Profile</p>
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
                          <Button
                            className="my-3 w-full rounded-md bg-primary  font-semibold text-white"
                            // isLoading={isLoading && isSuccess}
                            size="lg"
                            type="submit"
                          >
                            Create Product
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
