import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/app/redux/store";
import {
  replaceCart,
  cancelAddition,
} from "@/app/redux/features/cart/cartSlice";

const ReplaceCartModal = () => {
  const dispatch = useDispatch();

  const cartConflict = useSelector(
    (state: RootState) => state.cart.vendorConflict
  );

  if (!cartConflict) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold">Replace Cart?</h2>
        <p className="text-sm text-gray-600 my-4">
          Your cart contains items from a different vendor. Would you like to
          replace the current cart with the new product(s) or cancel the
          addition?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => dispatch(cancelAddition())}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => dispatch(replaceCart())}
          >
            Replace Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplaceCartModal;
