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

export default function CreateCategoryModal({
  isOpen,
  onOpenChange,
  handleCreateOrder,
  isSuccess,
  isForBuy = false,
  handleCreateCategory,
  isLoading,
  categoryLoadingName,
}: any) {
  const [paymentValue, setPaymentValue] = useState("");

  console.log("loading name", categoryLoadingName);
  return (
    <>
      <Modal isOpen={isOpen} size="2xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Create Category
              </ModalHeader>
              <ModalBody>
                <GTForm onSubmit={handleCreateCategory}>
                  <div className="py-3">
                    <GTInput label="Name" name="name" type="text" />
                  </div>
                  <div className="py-3">
                    <GTInput label="Image URL" name="imageUrl" type="text" />
                  </div>
                  <Button
                    className="my-3 w-full rounded-md bg-primary  font-semibold text-white"
                    isLoading={isLoading}
                    size="lg"
                    type="submit"
                  >
                    {categoryLoadingName}
                  </Button>
                </GTForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
