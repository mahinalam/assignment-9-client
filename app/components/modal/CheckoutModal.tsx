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

export default function CheckoutModal({
  isOpen,
  onOpenChange,
  handleCreateOrder,
  isSuccess,
}: any) {
  const [paymentValue, setPaymentValue] = useState("");

  const { data: cartQuantity, isLoading: cartQuantityLoading } =
    useGetCartQuantityQuery(null);
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);

  console.log("cartQuantity", cartQuantity);
  const onSubmit = (data: any) => {
    const payload = {
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phoneNumber,
      customerShippingAddress: data.address,
    };

    return handleCreateOrder(payload);
  };

  //   console.log(data);
  return (
    <>
      <Modal isOpen={isOpen} size="2xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Shipping Info
              </ModalHeader>
              <ModalBody>
                <GTForm onSubmit={onSubmit}>
                  <div className="py-3">
                    <GTInput
                      readonly
                      defaultValue={userEmail}
                      label="Email"
                      name="email"
                      type="email"
                    />
                  </div>
                  <div className="py-3">
                    <GTInput label="Name" name="name" type="text" />
                  </div>
                  <div className="py-3">
                    <GTInput label="Phone" name="phoneNumber" type="Phone" />
                  </div>
                  <div className="py-3">
                    <GTInput label="Address" name="address" type="text" />
                  </div>
                  <div className="py-3">
                    <RadioGroup
                      color="secondary"
                      label="Select Payment Method"
                      value={paymentValue}
                      onValueChange={setPaymentValue}
                    >
                      <Radio value="online">Online Payment</Radio>
                      <Radio value="cod">Cash On Delivery</Radio>
                    </RadioGroup>
                  </div>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={() => onClose()}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      isLoading={isSuccess}
                      type="submit"
                      // onPress={() => onClose()}
                    >
                      Proceed to Pay
                    </Button>
                  </ModalFooter>
                </GTForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
