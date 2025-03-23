import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Enums
export enum UserRole {
  ADMIN = "ADMIN",
  VENDOR = "VENDOR",
  USER = "USER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

export enum PaymentMethod {
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  BKASH = "BKASH",
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

// Models
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber?: string;
  address?: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  shop?: IShop;
  order: IOrder[];
  review: IReview[];
}

export interface IShop {
  id: string;
  name: string;
  description?: string;
  address: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  ownerId: string;
  owner: IUser;
  products: IProduct[];
}

export interface ICategory {
  id: string;
  name: string;
  imageUrl: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  Product: IProduct[];
}

export interface IProduct {
  id: string;
  name: string;
  description?: string;
  newPrice: number;
  oldPrice: number;
  stock: number;
  isFlash: boolean;
  images: string[];
  disCounts: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  shop?: IShop;
  shopId?: string;
  categoryId: string;
  category: ICategory;
  orderItem: IOrderItem[];
  review: IReview[];
}

export interface IOrder {
  id: string;
  status: OrderStatus;
  totalPrice: number;
  customerShippingAddress: string;
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  paymentStatus: PaymentStatus;
  userId: string;
  user: IUser;
  orderItems: IOrderItem[];
}

export interface IOrderItem {
  id: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  productId: string;
  product: IProduct;
  orderId: string;
  order: IOrder;
}

export interface IReview {
  id: string;
  rating: number;
  comment?: string;
  images?: string[];
  createdAt: Date;
  productId: string;
  product: IProduct;
  userId: string;
  user: IUser;
  isDeleted: boolean;
}

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
  id?: string;
}

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
