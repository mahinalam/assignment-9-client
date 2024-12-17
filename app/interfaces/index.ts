export interface IUser {
  id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  phoneNumber: string;
  address: string;
  profilePhoto?: string;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
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
