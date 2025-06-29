"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

import GTForm from "@/app/components/form/GTForm";
import GTInput from "@/app/components/form/GTInput";
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
  const [createImageFile, setCreateImageFile] = useState<File | undefined>(
    undefined,
  );

  const onSubmit: any = async (data: any, methods: any) => {
    const id = toast.loading("Signing up...");

    try {
      if (value === "VENDOR") {
        const formData = new FormData();
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

        formData.append("data", JSON.stringify(vendorData));
        formData.append("shopImage", createImageFile as File);
        const res = await signupVendor(formData).unwrap();
        const user = verifyToken((res as any).data?.accessToken);

        dispatch(setUser({ user: user, token: res.data.accessToken }));
        toast.success("Registration successful!", { id });
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
        toast.success("Registration successful!", { id });
        router.push("/");
      }

      // }
    } catch (error: any) {
      toast.error(error?.data?.message, { id });
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
    <div>
      <div className=" flex min-h-screen bg-[#f5f5f5] items-center justify-center px-3 pt-40 lg:px-0  w-full">
        {/* <div className="flex items-center justify-center"> */}
        <div className=" border p-5 bg-white w-full max-w-[500px] rounded-md shadow-md">
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
                <div>
                  <p className="mb-2 lg:mt-0  text-sm font-medium">
                    Upload Image
                  </p>
                  <label
                    aria-label="Upload your files"
                    className={`flex cursor-pointer items-center gap-3 rounded border border-dashed border-athens-gray-200 bg-white p-3 transition-all`}
                    htmlFor="image"
                  >
                    <div className="flex size-16 items-center justify-center rounded-full bg-athens-gray-50">
                      <svg
                        className="lucide lucide-folder-open-dot size-5 text-athens-gray-500"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
                        <circle cx="14" cy="15" r="1" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-athens-gray-600">
                        Upload shop image
                      </h5>
                      <small className="text-sm text-athens-gray-400">
                        Click to browse JPG,JPEG or PNG formats.
                      </small>
                    </div>
                  </label>
                  <input
                    className="w-full  hidden mt-1 lg:mb-8 rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
                    id="image"
                    name="image"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        setCreateImageFile(file);
                      }
                    }}
                  />
                  {createImageFile?.name && (
                    <div className="mb-2 relative flex items-center gap-2 rounded-md border border-athens-gray-200 bg-white p-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-athens-gray-100">
                        <svg
                          className="lucide lucide-image size-4 text-athens-gray-800"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            height="18"
                            rx="2"
                            ry="2"
                            width="18"
                            x="3"
                            y="3"
                          />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                      </div>
                      <div>
                        <h6 className="!text-sm">{createImageFile?.name}</h6>
                        <p className="!text-xs !text-athens-gray-500">{`${createImageFile ? Number(createImageFile?.size) / 1000 : 0.0} KB`}</p>
                      </div>
                      <div className="absolute inset-y-0 right-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => setCreateImageFile(undefined)}
                        >
                          <svg
                            className="lucide lucide-trash2 size-4 text-athens-gray-500 transition-all hover:text-athens-gray-800"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
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
    </div>
  );
};

export default SignupPage;
