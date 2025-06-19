"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
// import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

import GTForm from "@/app/components/form/GTForm";
import GTInput from "@/app/components/form/GTInput";
import Container from "@/app/components/sharred/Container";
import {
  useSignUpCustomerMutation,
  useSignUpVendorMutation,
} from "@/app/redux/features/auth/authApi";
import GTTextArea from "@/app/components/form/GTTestArea";
import { verifyToken } from "@/app/utils/verifyToken";
import { setUser } from "@/app/redux/features/auth/authSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [signupVendor] = useSignUpVendorMutation();
  const [signUpCustomer] = useSignUpCustomerMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data, methods: any) => {
    console.log(data);
    try {
      console.log({ ...data, role: value });
      if (value === "VENDOR") {
        const vendorData = {
          user: {
            email: data.email,
            password: data.password,
          },
          vendor: {
            name: data.name,
          },
          shop: {
            name: data.shop_name,
            address: data.shop_address,
            description: data.shop_description,
          },
        };
        const res = await signupVendor(vendorData).unwrap();
        console.log("res", res);
        const user = verifyToken((res as any).data?.accessToken);

        dispatch(setUser({ user: user, token: res.data.accessToken }));
        toast.success("Registration successful!");
        router.push("/");
      } else {
        const customerData = {
          user: {
            email: data.email,
            password: data.password,
          },
          customer: {
            name: data.name,
          },
        };

        const res = await signUpCustomer(customerData).unwrap();
        const user = verifyToken((res as any).data?.accessToken);

        dispatch(setUser({ user: user, token: res.data.accessToken }));
        toast.success("Registration successful!");
        router.push("/");
      }

      // Wait for the loginUser Promise to resolve
      // const res = await signupUser(data).unwrap();

      // console.log("res", res);

      // if (res?.success) {
      //   router.push("/login");
      // }
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.log("Login failed:", error);
    }
  };

  const options = [
    {
      key: "CUSTOMER",
      label: "CUSTOMER",
    },
    {
      key: "VENDOR",
      label: "VENDOR",
    },
  ];

  return (
    <Container>
      <div className="flex items-center justify-center md:mt-[200px] mt-16">
        <div className="md:w-[40%] mx-auto border p-5 bg-white">
          <div>
            <p className="text-center text-[18px] font-bold">Signup</p>
          </div>
          <GTForm onSubmit={onSubmit}>
            <div className="py-3">
              <GTInput label="Name" name="name" type="text" />
            </div>
            <div className="py-3">
              <GTInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3">
              <GTInput label="Password" name="password" type="password" />
            </div>
            <div className="py-3">
              <Select
                className="min-w-full sm:min-w-[225px]"
                // id={id}
                label="Role"
                name="role"
                onChange={(e) => setValue(e.target.value)}
              >
                {options.map((option) => (
                  <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
              </Select>
            </div>{" "}
            {value === "VENDOR" && (
              <>
                <div>
                  <p className="text-center font-medium text-sm">Shop Info</p>
                </div>
                <div className="py-3">
                  <GTInput label="Name" name="shop_name" type="text" />
                </div>
                <div className="py-3">
                  <GTInput label="Address" name="shop_address" type="text" />
                </div>
                <div className="py-3">
                  <GTTextArea
                    label="Description"
                    name="shop_description"
                    type="text"
                  />
                </div>
              </>
            )}
            {/* <div className="py-3">
              <GTInput label="Phone Number" name="phoneNumber" type="text" />
            </div>
            <div className="py-3">
              <GTInput label="Address" name="address" type="text" />
            </div> */}
            <Button
              className="my-3 w-full rounded-md bg-primary  font-semibold text-white"
              size="lg"
              type="submit"
            >
              Signup
            </Button>
            <small>
              Already have an Account?
              <Link className="text-primary underline ml-1" href="/login">
                Login
              </Link>
            </small>
          </GTForm>
        </div>
      </div>
    </Container>
  );
};

export default SignupPage;
