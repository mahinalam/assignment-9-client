"use client";

import { useDisclosure } from "@nextui-org/react";
import React from "react";
import { toast } from "sonner";

import {
  useCreateCartMutation,
  useRemoveCartMutation,
} from "@/app/redux/features/cart/cartApi";
import CartRemoveWarningModal from "@/app/components/modal/CartRemoveWarningModal";

const CartPage = ({ cartData }: { cartData: any }) => {
  const [removeCart] = useRemoveCartMutation();

  const {
    isOpen: isCartRemoveWarningModalOpen,
    onOpen: onCartRemoveWarningModalOpen,
    onOpenChange: onCartRemoveModalChange,
    onClose: onRemoveCartClose,
  } = useDisclosure();

  const { id, product, quantity } = cartData;
  const [createCart] = useCreateCartMutation();

  console.log("cartdata", cartData);
  const {
    newPrice,
    oldPrice,
    images,
    name,
    description,
    stock,
    id: productId,
    shopId,
  } = product;

  const handleRemoveCart = async () => {
    await removeCart({ cartItemId: id }).unwrap();
    onRemoveCartClose();
  };

  // const [cartQuantity, setCartQuantity] = useState(quantity);

  const handleAddToCart = async (type: "incre" | "decre") => {
    let cartInfo = {
      productId,
      shopId,
      quantity: type === "incre" ? 1 : -1,
      price: newPrice,
    };

    try {
      const res = await createCart(cartInfo).unwrap();

      if (res?.success) {
        // toast.success("Product added to cart.");
      }
      console.log("res from cart", res);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="flex justify-between items-center border-b pb-4 mb-4">
      {/* <Checkbox
        isSelected={isChecked} // Controlled by parent
        onChange={(e) => handleCheckboxChange(productId, e.target.checked)}
      /> */}
      <img
        alt={images[0]}
        className="h-20 w-20 object-cover rounded ml-3"
        src={images[0]}
      />
      <div className="flex-1 ml-4">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-500">
          {description.length > 100 && description.substring(0, 100)} ...
        </p>
        <p className="text-primary font-medium">
          <span className="line-through text-gray-400 mr-2">৳ {oldPrice}</span>৳{" "}
          {newPrice}
        </p>
      </div>
      <div className="flex items-center">
        <button
          className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:cursor-not-allowed"
          disabled={quantity === 1}
          onClick={() => {
            // setCartQuantity((value: number) => value - 1);
            handleAddToCart("decre");
          }}
        >
          -
        </button>
        <span className="mx-4">{quantity}</span>
        <button
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          disabled={stock === quantity}
          onClick={() => {
            // setCartQuantity((value: number) => value + 1);
            handleAddToCart("incre");
          }}
        >
          +
        </button>
      </div>
      <button
        className="text-red-500 hover:text-red-600 ml-4"
        onClick={() => onCartRemoveWarningModalOpen()}
      >
        Remove
      </button>
      <CartRemoveWarningModal
        handleRemoveCart={handleRemoveCart}
        isOpen={isCartRemoveWarningModalOpen}
        onOpenChange={onCartRemoveModalChange}
      />
    </div>
  );
};

export default CartPage;
