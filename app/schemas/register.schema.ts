import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["CUSTOMER", "VENDOR"], {
    required_error: "Role is required",
  }),
  shop_name: z.string().optional(),
  shop_address: z.string().optional(),
  shop_description: z.string().optional(),
  image: z.any().optional(),
});
