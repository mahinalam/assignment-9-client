// import React from "react";
// import GTForm from "../form/GTForm";
// import GTInput from "../form/GTInput";
// import { DateInput } from "@nextui-org/react";
// import { Button } from "@nextui-org/button";

// const CreateCouponModal = ({
//   handleCreateCoupon,
//   setDateValue,
// }: {
//   handleCreateCoupon: any;
//   setDateValue: any;
// }) => {
//   return (
//     <div>
//       <GTForm onSubmit={handleCreateCoupon}>
//         <div className="py-3">
//           <GTInput label="Code" name="code" type="text" />
//         </div>
//         <div className="py-3">
//           <GTInput label="Discount" name="discount" type="number" />
//         </div>
//         <div className="py-3">
//           <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//             <DateInput
//               label={"Expiration Date"}
//               onChange={(value: any) => setDateValue(value)}
//               variant="bordered"
//               // placeholderValue={new Date()}
//             />
//           </div>
//         </div>
//         <div className="py-3">
//           <GTInput label="Min. Purchase" name="minPurchase" type="number" />
//         </div>
//         <Button
//           className="my-3 w-full rounded-md bg-primary  font-semibold text-white"
//           //   isLoading={isLoading && isSuccess}
//           size="lg"
//           type="submit"
//         >
//           Create Coupon
//         </Button>
//       </GTForm>
//     </div>
//   );
// };

// export default CreateCouponModal;

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
  DateInput,
} from "@nextui-org/react";
import { useState } from "react";
import { useSelector } from "react-redux";

import GTInput from "../form/GTInput";
import GTForm from "../form/GTForm";

import { useGetCartQuantityQuery } from "@/app/redux/features/cart/cartApi";
import { RootState } from "@/app/redux/store";

export default function CreateCouponModal({
  isOpen,
  onOpenChange,
  handleCreateCoupon,
  isLoading,
  couponLoadingName,
  setDateValue,
}: any) {
  const [paymentValue, setPaymentValue] = useState("");

  console.log("loading name", couponLoadingName);
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
                        onChange={(value: any) => setDateValue(value)}
                        variant="bordered"
                        // placeholderValue={new Date()}
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
