"use client";

import { Modal, ModalContent, ModalBody, Button } from "@nextui-org/react";

import GTInput from "../form/GTInput";
import GTForm from "../form/GTForm";
import GTSelect from "../form/GTSelect";
import GTTextArea from "../form/GTTestArea";

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
}: any) {
  const { data: categoriesData, isLoading: categoriesDataLoading } =
    useGetAllCategoriesQuery(null);

  if (categoriesDataLoading) {
    return;
  }

  const categoriesOption = categoriesData?.data?.data?.map(
    (item: ICategory) => ({
      key: item.id,
      label: item.name,
    }),
  );

  return (
    <>
      <Modal
        className="w-full"
        isOpen={isOpen}
        size="3xl"
        onOpenChange={(isOpen) => {
          onOpenChange(isOpen);
          if (!isOpen) {
            setCreateProductImageFiles([]);
          }
        }}
      >
        <ModalContent>
          {() => (
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
                          <div className="py-3">
                            <GTTextArea
                              label="Short description"
                              name="shortDescription"
                              rows={3}
                              type="text"
                            />
                          </div>
                          <div className="py-3">
                            <GTTextArea
                              label="Long description"
                              name="longDescription"
                              type="text"
                            />
                          </div>

                          <div>
                            <p className="mb-2 lg:mt-0  text-sm font-medium">
                              Upload Image
                            </p>
                            <label
                              aria-label="Upload Your Files"
                              className={`flex cursor-pointer items-center gap-3 rounded border border-dashed border-athens-gray-200 bg-white p-3 transition-all`}
                              htmlFor="image"
                            >
                              <div className="flex size-16 items-center justify-center rounded-full bg-athens-gray-50">
                                <svg
                                  className="lucide lucide-folder-open-dot size-5 text-athens-gray-500"
                                  fill="none"
                                  height="24"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
                                  <circle cx="14" cy="15" r="1" />
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
                              className="w-full  hidden mt-1 lg:mb-8 rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
                              id="image"
                              name="image"
                              type="file"
                              onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (file) {
                                  setCreateProductImageFiles(
                                    (prevImages: File[]) => [
                                      ...prevImages,
                                      file,
                                    ],
                                  );
                                }
                              }}
                            />

                            {createImageFiles?.length > 0 &&
                              createImageFiles.map(
                                (imageFile: File, index: number) => (
                                  <div
                                    key={index}
                                    className="mb-2 relative flex items-center gap-2 rounded-md border border-athens-gray-200 bg-white p-3"
                                  >
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-athens-gray-100">
                                      <svg
                                        className="lucide lucide-image size-4 text-athens-gray-800"
                                        fill="none"
                                        height="24"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <rect
                                          height="18"
                                          rx="2"
                                          ry="2"
                                          width="18"
                                          x="3"
                                          y="3"
                                        />
                                        <circle cx="9" cy="9" r="2" />
                                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
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
                                        type="button"
                                        onClick={() =>
                                          handleDeleteCreateProducts(imageFile)
                                        }
                                      >
                                        <svg
                                          className="lucide lucide-trash2 size-4 text-athens-gray-500 transition-all hover:text-athens-gray-800"
                                          fill="none"
                                          height="24"
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          viewBox="0 0 24 24"
                                          width="24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="M3 6h18" />
                                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                          <line
                                            x1="10"
                                            x2="10"
                                            y1="11"
                                            y2="17"
                                          />
                                          <line
                                            x1="14"
                                            x2="14"
                                            y1="11"
                                            y2="17"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                ),
                              )}
                            {createImageFiles.length < 3 && (
                              <p className="text-red-600 text-sm">
                                [NB] Please upload at least 3 product images to
                                proceed.
                              </p>
                            )}
                          </div>
                          <Button
                            className="my-3 w-full disabled:cursor-not-allowed rounded-md bg-primary  font-semibold text-white"
                            disabled={createImageFiles.length < 3}
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
