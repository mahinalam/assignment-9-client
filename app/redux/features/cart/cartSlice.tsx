// // import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// // import { toast } from "sonner";

// // export interface ICartItem {
// //   productId: string;
// //   productName: string;
// //   quantity: number;
// //   oldPrice: number;
// //   newPrice: number;
// //   image: string;
// //   description: string;
// // }

// // interface ICartState {
// //   items: ICartItem[];
// //   shopId: string;
// //   totalQuantity: number;
// //   totalAmount: number;
// // }

// // export type THandleCart = (id: string) => void;

// // const initialState: ICartState = {
// //   items: [],
// //   shopId: "",
// //   totalQuantity: 0,
// //   totalAmount: 0,
// // };

// // export const cartSlice = createSlice({
// //   name: "cart",
// //   initialState,
// //   reducers: {
// //     addToCart: (
// //       state,
// //       action: PayloadAction<ICartItem & { shopId: string }>
// //     ) => {
// //       console.log("state", action.payload);
// //       const newItem = {
// //         productId: action.payload.productId,
// //         productName: action.payload.productName,
// //         quantity: action.payload.quantity,
// //         newPrice: action.payload.newPrice,
// //         oldPrice: action.payload.oldPrice,
// //         image: action.payload.image,
// //         description: action.payload.description,
// //       };

// //       if (!state.shopId) {
// //         state.shopId = action.payload.shopId;
// //       } else {
// //         state.shopId = action.payload.shopId;
// //       }

// //       // Check if the new item's shopId matches the current cart's shopId
// //       if (state.shopId != action.payload.shopId) {
// //         toast.error(
// //           "You cannot add items from different shops to the same cart. Please clear the cart first."
// //         );
// //         throw new Error(
// //           "You cannot add items from different shops to the same cart. Please clear the cart first."
// //         );
// //       }

// //       //   const newItem = action.payload;
// //       const existingItem = state.items.find(
// //         (item) => item.productId === newItem.productId
// //       );

// //       if (existingItem) {
// //         // Update the quantity if the item already exists in the cart
// //         if (existingItem.quantity) {
// //           existingItem.quantity++;
// //           state.totalQuantity++;
// //           state.totalAmount += newItem.newPrice;
// //         }
// //       } else {
// //         // Add new item to the cart
// //         state.items.push({ ...newItem, quantity: 1 });
// //         state.totalQuantity++;
// //         state.totalAmount += newItem.newPrice;
// //       }
// //     },
// //     incrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
// //       const { id } = action.payload;
// //       const item = state.items.find((item) => item.productId === id);

// //       if (item && item.quantity) {
// //         item.quantity++;
// //         state.totalQuantity++;
// //         state.totalAmount += item.newPrice;
// //       }
// //     },
// //     decrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
// //       const { id } = action.payload;
// //       const item = state.items.find((item) => item.productId === id);

// //       if (item && item.quantity > 1) {
// //         item.quantity--;
// //         state.totalQuantity--;
// //         state.totalAmount -= item.newPrice;
// //       }
// //     },
// //     removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
// //       const { id } = action.payload;
// //       const existingItem = state.items.find((item) => item.productId === id);

// //       if (existingItem) {
// //         state.totalQuantity -= existingItem.quantity;
// //         state.totalAmount -= existingItem.newPrice * existingItem.quantity;
// //         state.items = state.items.filter((item) => item.productId !== id);
// //       }
// //     },
// //     clearCart: (state) => {
// //       state.items = [];
// //       state.shopId = ""; // Reset shopId when cart is cleared
// //       state.totalQuantity = 0;
// //       state.totalAmount = 0;
// //     },
// //   },
// // });

// // export const {
// //   addToCart,
// //   incrementQuantity,
// //   decrementQuantity,
// //   removeFromCart,
// //   clearCart,
// // } = cartSlice.actions;

// // export default cartSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { act } from "react";
// import { toast } from "sonner";

// export interface ICartItem {
//   productId: string;
//   productName: string;
//   quantity: number;
//   oldPrice: number;
//   newPrice: number;
//   image: string;
//   description: string;
// }

// interface ICartState {
//   items: ICartItem[];
//   shopId: string;
//   totalQuantity: number;
//   totalAmount: number;
//   vendorConflict: boolean; // Flag to show a conflict warning
//   pendingItems: ICartItem[]; // Temporary storage for new vendor items
// }

// const initialState: ICartState = {
//   items: [],
//   shopId: "",
//   totalQuantity: 0,
//   totalAmount: 0,
//   vendorConflict: false,
//   pendingItems: [],
// };

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     // addToCart: (
//     //   state,
//     //   action: PayloadAction<ICartItem & { shopId: string }>
//     // ) => {
//     //   const newItem = {
//     //     productId: action.payload.productId,
//     //     productName: action.payload.productName,
//     //     quantity: action.payload.quantity,
//     //     newPrice: action.payload.newPrice,
//     //     oldPrice: action.payload.oldPrice,
//     //     image: action.payload.image,
//     //     description: action.payload.description,
//     //   };
//     //   console.log("new", newItem);
//     //   // if (!state.shopId) {
//     //   //   // First product in the cart
//     //   //   state.shopId = action.payload.shopId;
//     //   // } else {
//     //   //   state.shopId = action.payload.shopId;
//     //   // }

//     //   // if (state.shopId !== action.payload.shopId) {
//     //   //   toast.error("something went wrong");
//     //   //   // Vendor conflict detected
//     //   //   state.pendingItems = [newItem]; // Store the new item temporarily
//     //   //   state.vendorConflict = true; // Trigger the conflict warning
//     //   //   return;
//     //   // }

//     //   const existingItem = state.items.find(
//     //     (item) => item.productId === newItem.productId
//     //   );
//     //   const isExistingShop = state.shopId === action.payload.shopId;
//     //   if (!existingItem && isExistingShop) {
//     //     state.shopId = action.payload.shopId;
//     //     // Add new item to the cart
//     //     state.items.push({ ...newItem, quantity: 1 });
//     //     state.totalQuantity++;
//     //     state.totalAmount += newItem.newPrice;
//     //   }

//     //   if (existingItem) {
//     //     existingItem.quantity++;
//     //     state.totalQuantity++;
//     //     state.totalAmount += newItem.newPrice;
//     //   }
//     //   if (!isExistingShop && !existingItem) {
//     //     state.pendingItems = [newItem]; // Store the new item temporarily
//     //     state.vendorConflict = true;
//     //     return;
//     //   }
//     //   // if ( !isExistingShop) {
//     //   //   state.shopId = action.payload.shopId;
//     //   //   // Add new item to the cart
//     //   //   state.items.push({ ...newItem, quantity: 1 });
//     //   //   state.totalQuantity++;
//     //   //   state.totalAmount += newItem.newPrice;
//     //   // }

//     //   // const isExistingShop = state.shopId === action.payload.shopId;
//     //   // if (!isExistingShop) {
//     //   //   state.pendingItems = [newItem]; // Store the new item temporarily
//     //   //   state.vendorConflict = true;
//     //   //   return;
//     //   // } else {
//     //   //   existingItem!.quantity++;
//     //   //   state.totalQuantity++;
//     //   //   state.totalAmount += newItem.newPrice;
//     //   // }

//     //   // if (isExistingShop && existingItem) {
//     //   //   existingItem.quantity++;
//     //   //   state.totalQuantity++;
//     //   //   state.totalAmount += newItem.newPrice;
//     //   // }

//     //   // const existingItem = state.items.find(
//     //   //   (item) => item.productId === newItem.productId
//     //   // );

//     //   // if (existingItem) {
//     //   //   if (state.shopId !== action.payload.shopId) {
//     //   //     toast.error("something went wrong");
//     //   //     // Vendor conflict detected
//     //   //     state.pendingItems = [newItem]; // Store the new item temporarily
//     //   //     state.vendorConflict = true; // Trigger the conflict warning
//     //   //     return;
//     //   //   }
//     //   //   // Update quantity of existing item
//     //   //   existingItem.quantity++;
//     //   //   state.totalQuantity++;
//     //   //   state.totalAmount += newItem.newPrice;
//     //   // } else {
//     //   //   state.shopId = action.payload.shopId;
//     //   //   // Add new item to the cart
//     //   //   state.items.push({ ...newItem, quantity: 1 });
//     //   //   state.totalQuantity++;
//     //   //   state.totalAmount += newItem.newPrice;
//     //   // }
//     // },

//     replaceCart: (state) => {
//       if (state.pendingItems.length > 0) {
//         const [newItem] = state.pendingItems;
//         // Replace the current cart with the pending item
//         state.items = [{ ...newItem, quantity: 1 }];
//         state.shopId = newItem.productId; // Set the new vendor's shopId
//         state.totalQuantity = 1;
//         state.totalAmount = newItem.newPrice;
//         state.pendingItems = [];
//         state.vendorConflict = false;
//         toast.success("Cart replaced with items from the new vendor.");
//       }
//     },

//     cancelAddition: (state) => {
//       // Discard the pending items
//       state.pendingItems = [];
//       state.vendorConflict = false;
//       toast.info("Item addition canceled.");
//     },

//     incrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
//       const { id } = action.payload;
//       const item = state.items.find((item) => item.productId === id);

//       if (item && item.quantity) {
//         item.quantity++;
//         state.totalQuantity++;
//         state.totalAmount += item.newPrice;
//       }
//     },

//     decrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
//       const { id } = action.payload;
//       const item = state.items.find((item) => item.productId === id);

//       if (item && item.quantity > 1) {
//         item.quantity--;
//         state.totalQuantity--;
//         state.totalAmount -= item.newPrice;
//       }
//     },

//     removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
//       const { id } = action.payload;
//       const existingItem = state.items.find((item) => item.productId === id);

//       if (existingItem) {
//         state.totalQuantity -= existingItem.quantity;
//         state.totalAmount -= existingItem.newPrice * existingItem.quantity;
//         state.items = state.items.filter((item) => item.productId !== id);
//       }
//     },

//     clearCart: (state) => {
//       // Clear the entire cart and reset state
//       state.items = [];
//       state.shopId = "";
//       state.totalQuantity = 0;
//       state.totalAmount = 0;
//       state.pendingItems = [];
//       state.vendorConflict = false;
//       toast.success("Cart cleared successfully.");
//     },
//   },
// });

// export const {
//   addToCart,
//   incrementQuantity,
//   decrementQuantity,
//   removeFromCart,
//   clearCart,
//   replaceCart,
//   cancelAddition,
// } = cartSlice.actions;

// export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface ICartItem {
  productId: string;
  productName: string;
  quantity: number;
  oldPrice: number;
  newPrice: number;
  image: string;
  description: string;
}

interface ICartState {
  items: ICartItem[];
  shopId: string;
  totalQuantity: number;
  totalAmount: number;
  vendorConflict: boolean; // Flag for vendor conflict
  pendingItems: ICartItem[]; // Temporary storage for items causing conflicts
}

const initialState: ICartState = {
  items: [],
  shopId: "",
  totalQuantity: 0,
  totalAmount: 0,
  vendorConflict: false,
  pendingItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart: (

    //   state,
    //   action: PayloadAction<ICartItem & { shopId: string }>
    // ) => {
    //   const newItem = {
    //     productId: action.payload.productId,
    //     productName: action.payload.productName,
    //     quantity: action.payload.quantity,
    //     newPrice: action.payload.newPrice,
    //     oldPrice: action.payload.oldPrice,
    //     image: action.payload.image,
    //     description: action.payload.description,
    //   };

    //   // Check if cart has a shopId assigned
    //   if (!state.shopId) {
    //     // First product being added, set shopId
    //     state.shopId = action.payload.shopId;
    //   }

    //   // Handle vendor conflict
    //   if (state.shopId !== action.payload.shopId) {
    //     state.pendingItems = [newItem]; // Store the conflicting item temporarily
    //     state.vendorConflict = true; // Trigger vendor conflict warning
    //     toast.error(
    //       "You cannot add items from a different vendor. Please replace the cart or cancel the addition."
    //     );
    //     return;
    //   }

    //   // Check if the product already exists in the cart
    //   const existingItem = state.items.find(
    //     (item) => item.productId === newItem.productId
    //   );

    //   if (existingItem) {
    //     // Increment quantity if item exists
    //     existingItem.quantity++;
    //     state.totalQuantity++;
    //     state.totalAmount += newItem.newPrice;
    //   } else {
    //     // Add new item to the cart
    //     state.items.push({ ...newItem, quantity: 1 });
    //     state.totalQuantity++;
    //     state.totalAmount += newItem.newPrice;
    //   }
    // },
    addToCart: (
      state,
      action: PayloadAction<ICartItem & { shopId: string }>
    ) => {
      const newItem = {
        productId: action.payload.productId,
        productName: action.payload.productName,
        quantity: action.payload.quantity,
        newPrice: action.payload.newPrice,
        oldPrice: action.payload.oldPrice,
        image: action.payload.image,
        description: action.payload.description,
      };

      // If cart is empty, reset shopId and allow adding the new product
      if (state.items.length === 0) {
        state.shopId = action.payload.shopId;
      }

      // Check for vendor conflict
      if (state.shopId && state.shopId !== action.payload.shopId) {
        state.pendingItems = [newItem]; // Store the conflicting item temporarily
        state.vendorConflict = true; // Trigger vendor conflict warning
        toast.error(
          "You cannot add items from a different vendor. Please replace the cart or cancel the addition."
        );
        return;
      }

      // Check if the product already exists in the cart
      const existingItem = state.items.find(
        (item) => item.productId === newItem.productId
      );

      if (existingItem) {
        // Increment quantity if item exists
        existingItem.quantity++;
        state.totalQuantity++;
        state.totalAmount += newItem.newPrice;
      } else {
        // Add new item to the cart
        state.items.push({ ...newItem, quantity: 1 });
        state.totalQuantity++;
        state.totalAmount += newItem.newPrice;
      }
    },

    replaceCart: (state) => {
      if (state.pendingItems.length > 0) {
        const [newItem] = state.pendingItems;
        // Replace current cart with new vendor's item
        state.items = [{ ...newItem, quantity: 1 }];
        state.shopId = newItem.productId; // Set new vendor's shopId
        state.totalQuantity = 1;
        state.totalAmount = newItem.newPrice;
        state.pendingItems = [];
        state.vendorConflict = false;
        toast.success("Cart replaced with items from the new vendor.");
      }
    },

    cancelAddition: (state) => {
      // Discard the conflicting item and resolve the conflict
      state.pendingItems = [];
      state.vendorConflict = false;
      toast.info("Item addition canceled.");
    },

    incrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.productId === id);

      if (item) {
        item.quantity++;
        state.totalQuantity++;
        state.totalAmount += item.newPrice;
      }
    },

    decrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.productId === id);

      if (item && item.quantity > 1) {
        item.quantity--;
        state.totalQuantity--;
        state.totalAmount -= item.newPrice;
      }
    },

    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.productId === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.newPrice * existingItem.quantity;
        state.items = state.items.filter((item) => item.productId !== id);
      }
    },

    clearCart: (state) => {
      // Clear the entire cart and reset state
      state.items = [];
      state.shopId = "";
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.pendingItems = [];
      state.vendorConflict = false;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  replaceCart,
  cancelAddition,
} = cartSlice.actions;

export default cartSlice.reducer;
