"use client";

import { Button } from "@nextui-org/button";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import GTForm from "@/app/components/form/GTForm";
import GTInput from "@/app/components/form/GTInput";
import { useGetSingleUserQuery } from "@/app/redux/features/user/userApi";
import { RootState } from "@/app/redux/store";
import { useCreateBrandMutation } from "@/app/redux/features/brand/brandApi";

const CreateBrand = () => {
  const [addBrand, { isSuccess, isLoading }] = useCreateBrandMutation();

  const user = useSelector((state: RootState) => state.auth.user?.userId);

  const { data: currentUserInfo } = useGetSingleUserQuery(user, {
    skip: !user,
  });

  const onSubmit = async (data: any) => {
    console.log("form data", data);
    try {
      const brandData = {
        ...data,
      };

      const res = await addBrand(brandData).unwrap();

      console.log("res", res);
      if (res?.success) {
        toast.success("Brand added successfully!");
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
              <p className="text-center text-[18px] font-bold">Add Brand</p>
            </div>
            <GTForm onSubmit={onSubmit}>
              <div className="py-3">
                <GTInput label="Name" name="name" type="text" />
              </div>
              <div className="py-3">
                <GTInput label="Description" name="description" type="text" />
              </div>
              <div className="py-3">
                <GTInput label="Image URL" name="logoUrl" type="text" />
              </div>
              <Button
                className="my-3 w-full rounded-md bg-primary  font-semibold text-white"
                isLoading={isLoading && isSuccess}
                size="lg"
                type="submit"
              >
                Create Brand
              </Button>
            </GTForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBrand;
