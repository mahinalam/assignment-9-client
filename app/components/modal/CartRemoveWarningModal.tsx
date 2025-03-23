"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function CartRemoveWarningModal({
  isOpen,
  onOpenChange,
  handleRemoveCart,
}: any) {
  //   console.log(data);
  return (
    <>
      <Modal isOpen={isOpen} size="sm" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <p className="text-[#212121]">Remove from Cart</p>
              </ModalHeader>
              <ModalBody>
                <p className="text-[#212121]">
                  Item(s) will be removed from order
                </p>
                <ModalFooter>
                  <Button
                    color="default"
                    radius="none"
                    size="sm"
                    variant="bordered"
                    onPress={() => onClose()}
                  >
                    CANCEL
                  </Button>
                  <Button
                    className="bg-[#2abbe8]"
                    color="primary"
                    radius="none"
                    size="sm"
                    type="submit"
                    onClick={() => handleRemoveCart()}
                  >
                    REMOVE
                  </Button>
                </ModalFooter>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
