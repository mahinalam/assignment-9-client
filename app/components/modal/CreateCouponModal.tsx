"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  DateInput,
} from "@nextui-org/react";

import GTInput from "../form/GTInput";
import GTForm from "../form/GTForm";

export default function CreateCouponModal({
  isOpen,
  onOpenChange,
  handleCreateCoupon,
  isLoading,
  couponLoadingName,
  setDateValue,
}: any) {
  return (
    <>
      <Modal isOpen={isOpen} size="2xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Create Coupon
              </ModalHeader>
              <ModalBody>
                <GTForm onSubmit={handleCreateCoupon}>
                  <div className="py-3">
                    <GTInput label="Code" name="code" type="text" />
                  </div>
                  <div className="py-3">
                    <GTInput label="Discount" name="discount" type="number" />
                  </div>
                  <div className="py-3">
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <DateInput
                        label={"Expiration Date"}
                        variant="bordered"
                        onChange={(value: any) => setDateValue(value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      className="my-3  rounded-md bg-primary  font-semibold text-white"
                      isLoading={isLoading}
                      size="lg"
                      type="submit"
                    >
                      {couponLoadingName}
                    </Button>
                  </div>
                </GTForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
