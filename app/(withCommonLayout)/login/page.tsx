"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import GTForm from "@/app/components/form/GTForm";
import GTInput from "@/app/components/form/GTInput";
import { verifyToken } from "@/app/utils/verifyToken";
import { setUser } from "@/app/redux/features/auth/authSlice";
import { useLoginMutation } from "@/app/redux/features/auth/authApi";
import loginValidationSchema from "@/app/schemas/login.schema";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loginUser, result] = useLoginMutation();
  const [userLoginDefaultValue, setUserLoginDefaultValue] = useState<
    | {
        email: string;
        password: string;
      }
    | undefined
  >(undefined);

  const onSubmit: any = async (data: any) => {
    const id = toast.loading("Logging in...");

    try {
      // Wait for the loginUser Promise to resolve
      const res = await loginUser(data).unwrap();

      // Assuming `verifyToken` is a function to decode or verify the token
      const user = verifyToken((res as any).data?.accessToken);

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id });
      router.push("/");
    } catch (err: any) {
      toast.error("Something went wrong!", { id });
    }
  };

  const handleCredentailsLogin = async (data: {
    email: string;
    password: string;
  }) => {
    const id = toast.loading("Logging in...");

    try {
      // Wait for the loginUser Promise to resolve
      const res = await loginUser(data).unwrap();

      // Assuming `verifyToken` is a function to decode or verify the token
      const user = verifyToken((res as any).data?.accessToken);

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id });
      router.push("/");
    } catch (err: any) {
      toast.error("Something went wrong!", { id });
    }
  };

  return (
    <>
      <div className=" flex justify-center items-center h-[100vh]">
        <div className="flex items-center justify-center ">
          <div className="  border p-5 bg-white">
            <div>
              <p className="text-center text-[18px] font-bold">Login</p>
              <div className="flex gap-2 my-4">
                <button
                  // type="submit"
                  className="bg-primary p-2 text-white rounded-lg text-sm"
                  onClick={() =>
                    handleCredentailsLogin({
                      email: "customer@gmail.com",
                      password: "123456",
                    })
                  }
                >
                  Customer Credentials
                </button>
                <button
                  className="bg-primary p-2 text-white rounded-lg text-sm"
                  onClick={() =>
                    handleCredentailsLogin({
                      email: "vendor@gmail.com",
                      password: "123456",
                    })
                  }
                >
                  Vendor Credentials
                </button>
                <button
                  className="bg-primary p-2 text-white rounded-lg text-sm"
                  onClick={() =>
                    handleCredentailsLogin({
                      email: "mahin@gmail.com",
                      password: "123456",
                    })
                  }
                >
                  Admin Credentials
                </button>
              </div>
            </div>
            <GTForm
              resolver={zodResolver(loginValidationSchema)}
              onSubmit={onSubmit}
            >
              <div className="py-3">
                <GTInput
                  defaultValue={
                    userLoginDefaultValue?.email && userLoginDefaultValue?.email
                  }
                  label="Email"
                  name="email"
                  type="email"
                />
              </div>
              <div className="py-3">
                <GTInput
                  defaultValue={
                    userLoginDefaultValue?.password &&
                    userLoginDefaultValue.password
                  }
                  label="Password"
                  name="password"
                  type="password"
                />
              </div>

              <Button
                className="my-3 w-full rounded-md bg-primary  font-semibold text-white"
                size="lg"
                type="submit"
              >
                Login
              </Button>
              <small>
                Dont have an Account?
                <Link className="text-primary underline ml-1" href="/signup">
                  Signup
                </Link>
              </small>
            </GTForm>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
