import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

const DeleteModal = ({
  isOpen,
  onOpenChange,
  handleDeleteProduct,
  title,
}: any) => {
  return (
    <>
      <Modal isOpen={isOpen} size="lg" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {title === "Store" ? "Block Store" : `Delete ${title}`}
              </ModalHeader>
              <ModalBody>
                <p className="">
                  {/* Are you sure you want to delete this {title}? */}
                  {title === "Store"
                    ? `Are you sure you want to block this ${title}?`
                    : `Are you sure you want to delete this {title}?`}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button
                  color="primary"
                  onClick={handleDeleteProduct}
                  onPress={onClose}
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
