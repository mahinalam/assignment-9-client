"use client";

import { Button } from "@nextui-org/button";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import GTForm from "@/app/components/form/GTForm";
import GTInput from "@/app/components/form/GTInput";
import { useCreateCategoryMutation } from "@/app/redux/features/category/categoryApi";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import { RootState } from "@/app/redux/store";

const CreateBrand = () => {
  const [addCategory, { isSuccess, isLoading }] = useCreateCategoryMutation();

  const user = useSelector((state: RootState) => state.auth.user?.userId);

  const { data: currentUserInfo } = useGetSingleUserQuery(user, {
    skip: !user,
  });

  const onSubmit = async (data: any) => {
    console.log("form data", data);
    try {
      const categoryData = {
        ...data,
      };

      const res = await addCategory(categoryData).unwrap();

      console.log("res", res);
      if (res?.success) {
        toast.success("Category added successfully!");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-center">
          <div className="md:w-[33%] mx-auto  p-5 bg-white">
            <div>
              <p className="text-center text-[18px] font-bold">Add Category</p>
            </div>
            <GTForm onSubmit={onSubmit}>
              <div className="py-3">
                <GTInput label="Name" name="name" type="text" />
              </div>
              <div className="py-3">
                <GTInput label="Image URL" name="imageUrl" type="text" />
              </div>
              <Button
                className="my-3 w-full rounded-md bg-primary  font-semibold text-white"
                isLoading={isLoading && isSuccess}
                size="lg"
                type="submit"
              >
                Create Category
              </Button>
            </GTForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBrand;
