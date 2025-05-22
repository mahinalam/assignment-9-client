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
import GTTextArea from "../form/GTTestArea";

interface IProps {
  isOpen: any;
  onOpenChange: any;
  productData: any;
  editProductImages: any;
  imageFiles: any;
  setImageFiles: any;
  handleUpdateProduct: any;
  updateProductLoadingName: any;
  handleDeleteNewProductImages: any;
  editProductLoading: boolean;
}

export default function EditProductModal({
  isOpen,
  onOpenChange,
  productData,
  editProductImages,
  editProductLoading,
  imageFiles,
  setImageFiles,
  handleUpdateProduct,
  updateProductLoadingName,
  handleDeleteNewProductImages,
}: IProps) {
  const { data: categoriesData, isLoading: categoriesDataLoading } =
    useGetAllCategoriesQuery(null);

  if (categoriesDataLoading) {
    return;
  }

  console.log("editProductImages from modal", editProductImages);
  const categoriesOption = categoriesData?.data?.data?.map(
    (item: ICategory) => ({
      key: item.id,
      label: item.name,
    })
  );

  const defaultSelectedCategory = categoriesOption.find(
    (category: any) => category.key === productData?.category?.id
  );

  // fn for truncate image name
  const truncateFileName = (name: string, front = 6, back = 8) => {
    if (name.length <= front + back + 3) return name;
    return `${name.slice(0, front)}...${name.slice(-back)}`;
  };

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
                          <p className=" text-[18px] font-bold">Edit Product</p>
                        </div>
                        <GTForm onSubmit={handleUpdateProduct}>
                          <div className="py-3 flex gap-2">
                            <GTInput
                              label="Product Name"
                              name="name"
                              type="text"
                              defaultValue={productData?.name}
                            />
                            <GTInput
                              label="Product Price"
                              name="price"
                              type="number"
                              defaultValue={productData?.price}
                            />
                          </div>

                          <div className="py-3 flex gap-2">
                            <GTInput
                              label="Stock Quantity"
                              name="stock"
                              type="number"
                              defaultValue={productData?.stock}
                            />
                            <GTInput
                              label="Product Discount"
                              name="discount"
                              type="number"
                              defaultValue={productData?.discount}
                            />
                          </div>
                          <div className="py-3">
                            <GTTextArea
                              label="Description"
                              name="description"
                              type="text"
                              defaultValue={productData.description}
                            />
                          </div>
                          <div className="py-3">
                            <GTSelect
                              label="Category"
                              name="categoryId"
                              options={categoriesOption}
                              type="text"
                              defaultSelectedKeys={defaultSelectedCategory.key}
                            />
                          </div>
                          <div className="py-3">
                            <p className="font-medium text-sm mb-3">
                              Previous images
                            </p>
                            <div>
                              {editProductImages?.map((image: any) => (
                                <div className="relative mb-2 flex items-center gap-2 rounded-md border border-athens-gray-200 bg-white p-3">
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
                                    <h6 className="!text-sm">{image?.name}</h6>
                                    <p className="!text-xs !text-athens-gray-500">
                                      {truncateFileName(image)}
                                    </p>
                                  </div>
                                  <div className="absolute inset-y-0 right-3 flex items-center">
                                    {/* <button
                                      onClick={() => handleDeleteImages(image)}
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
                                    </button> */}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

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
                                  setImageFiles((prevImages: File[]) => [
                                    ...prevImages,
                                    file,
                                  ]);
                                }
                              }}
                              type="file"
                              className="w-full  hidden mt-1 lg:mb-8 rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
                              name="image"
                              id="image"
                              placeholder="Jhon Deo"
                            ></input>

                            {imageFiles?.length > 0 &&
                              imageFiles.map((imageFile: File) => (
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
                                        handleDeleteNewProductImages(imageFile)
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
                            isLoading={editProductLoading}
                            className="my-3 w-full rounded-md bg-primary  font-semibold text-white"
                            size="lg"
                            type="submit"
                          >
                            {updateProductLoadingName}
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
