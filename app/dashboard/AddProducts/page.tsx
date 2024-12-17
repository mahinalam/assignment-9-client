"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import GTForm from "@/app/components/form/GTForm";
import GTInput from "@/app/components/form/GTInput";
import GTSelect from "@/app/components/form/GTSelect";
import { useGetAllCategoriesQuery } from "@/app/redux/features/category/categoryApi";
import { useCreateProductMutation } from "@/app/redux/features/product/productApi";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import { RootState } from "@/app/redux/store";
import { ICategory } from "@/types";

const AddProducts = () => {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [addProduct, { isSuccess, isLoading }] = useCreateProductMutation();

  console.log("is success", isSuccess);
  console.log("is loading", isLoading);

  const { data: categoriesData, isLoading: categoriesDataLoading } =
    useGetAllCategoriesQuery(null);

  const user = useSelector((state: RootState) => state.auth.user?.userId);

  const { data: currentUserInfo } = useGetSingleUserQuery(user, {
    skip: !user,
  });

  if (categoriesDataLoading) {
    return;
  }

  // console.log(currentUserInfo?.data?.shop?.id);
  // console.log("categoriesData", categoriesData);
  const categoriesOption = categoriesData?.data?.map((item: ICategory) => ({
    key: item.id,
    label: item.name,
  }));

  const onSubmit = async (data: any) => {
    // console.log("form data", data);
    try {
      const productData = {
        ...data,
        newPrice: Number(data.newPrice),
        oldPrice: Number(data.oldPrice),
        stock: Number(data.stock),
        shopId: currentUserInfo?.data?.shop?.id,
      };

      console.log("product data", productData);
      const formData = new FormData();

      formData.append("data", JSON.stringify(productData));
      for (let image of imageFiles) {
        formData.append("itemImages", image);
      }

      const res = await addProduct(formData).unwrap();

      if (res?.success) {
        toast.success("Product added successfully!");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

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

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Add Products</h1>
        <div className="flex items-center justify-center">
          <div className="md:w-[33%] mx-auto border p-5 bg-white">
            <div>
              <p className="text-center text-[18px] font-bold">Add Products</p>
            </div>
            <GTForm onSubmit={onSubmit}>
              <div className="py-3">
                <GTInput label="Product Name" name="name" type="text" />
              </div>
              <div className="py-3">
                <GTInput label="Shop Name" name="shopId" type="text" />
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
                <GTInput label="Old Price" name="oldPrice" type="number" />
              </div>
              <div className="py-3">
                <GTInput label="New Price" name="newPrice" type="number" />
              </div>
              <div className="py-3">
                <GTInput label="Stock Quantity" name="stock" type="number" />
              </div>
              {/* <div className="py-3">
                <input
                  onChange={(e) => setLogoImage(e.target.files![0])}
                  type="file"
                  name="logo"
                />
              </div> */}
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
              <Button
                className="my-3 w-full rounded-md bg-[#F57224]  font-semibold text-white"
                isLoading={isLoading && isSuccess}
                size="lg"
                type="submit"
              >
                Create Shop
              </Button>
            </GTForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
