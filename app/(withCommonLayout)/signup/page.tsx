"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
// import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { useDispatch } from "react-redux";

import GTForm from "@/app/components/form/GTForm";
import GTInput from "@/app/components/form/GTInput";
import Container from "@/app/components/sharred/Container";
import { useSignupMutation } from "@/app/redux/features/auth/authApi";
import GTSelect from "@/app/components/form/GTSelect";
import { toast } from "sonner";

const SignupPage = () => {
  const { theme } = useTheme();

  // const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  //   const { setIsLoading: userLoading } = useUser();

  // const searchParams = useSearchParams();
  // const redirect = searchParams.get("redirect");

  const [signupUser, result] = useSignupMutation();

  // console.log(redirect);
  //   const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  // const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //   console.log(data);
  //   const res = loginUser(data).unwrap();
  //   console.log("from login", res);

  //   // const user = verifyToken((res as any).data?.token);
  //   // console.log("user", user);
  // };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    try {
      console.log(data);

      // Wait for the loginUser Promise to resolve
      const res = await signupUser(data).unwrap();

      console.log("res", res);

      if (res?.success) {
        router.push("/login");
      }
      // Assuming `verifyToken` is a function to decode or verify the token
      // const user = verifyToken((res as any).data?.accessToken);

      // dispatch(setUser({ user: user, token: res.data.accessToken }));
      // alert("Logged in");

      // console.log("user", user);
    } catch (error: any) {
      toast.error(error.error.message);
      console.error("Login failed:", error);
    }
  };

  // console.log("login result", result);
  //   useEffect(() => {
  //     if (!isPending && isSuccess) {
  //       if (redirect) {
  //         router.push(redirect);
  //       } else {
  //         router.push("/");
  //       }
  //     }
  //   }, [isPending, isSuccess]);

  const options = [
    {
      key: "USER",
      label: "USER",
    },
    {
      key: "VENDOR",
      label: "VENDOR",
    },
  ];

  return (
    <Container>
      <div className="flex items-center justify-center">
        <div className="md:w-[33%] mx-auto border p-5 bg-white">
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
              <GTSelect
                label="Role"
                name="role"
                options={options}
                type="text"
              />
            </div>
            <div className="py-3">
              <GTInput label="Phone Number" name="phoneNumber" type="text" />
            </div>
            <div className="py-3">
              <GTInput label="Address" name="address" type="text" />
            </div>
            <Button
              className="my-3 w-full rounded-md bg-[#F57224]  font-semibold text-white"
              size="lg"
              type="submit"
            >
              Signup
            </Button>
            <small>
              Already have an Account?
              <Link className="text-[#F57224] underline ml-1" href="/signup">
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
