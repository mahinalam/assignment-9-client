import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

const ReviewModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: any;
  onOpenChange: any;
}) => {
  return (
    <>
      <Modal isOpen={isOpen} size="full" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                product-reviews
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this product?</p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewModal;
