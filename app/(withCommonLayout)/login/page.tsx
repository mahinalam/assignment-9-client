"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
// import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import GTForm from "@/app/components/form/GTForm";
import GTInput from "@/app/components/form/GTInput";
import Container from "@/app/components/sharred/Container";
import { verifyToken } from "@/app/utils/verifyToken";
import { setUser } from "@/app/redux/features/auth/authSlice";
import { useLoginMutation } from "@/app/redux/features/auth/authApi";

const LoginPage = () => {
  // const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  //   const { setIsLoading: userLoading } = useUser();

  // const searchParams = useSearchParams();
  // const redirect = searchParams.get("redirect");

  const [loginUser, result] = useLoginMutation();

  //   const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  // const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //   console.log(data);
  //   const res = loginUser(data).unwrap();
  //   console.log("from login", res);

  //   // const user = verifyToken((res as any).data?.token);
  //   // console.log("user", user);
  // };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // Wait for the loginUser Promise to resolve
      const res = await loginUser(data).unwrap();

      // Assuming `verifyToken` is a function to decode or verify the token
      const user = verifyToken((res as any).data?.accessToken);

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in.");
      router.push("/");

      console.log("user", user);
    } catch (err: any) {
      console.log("from login", err);
      throw new Error(err.message);
    }
  };

  return (
    <>
      <Container>
        <div className="flex items-center justify-center md:mt-[200px] mt-16">
          <div className="md:w-[33%] mx-auto border p-5 bg-white">
            <div>
              <p className="text-center text-[18px] font-bold">Login</p>
            </div>
            <GTForm onSubmit={onSubmit}>
              <div className="py-3">
                <GTInput label="Email" name="email" type="email" />
              </div>
              <div className="py-3">
                <GTInput label="Password" name="password" type="password" />
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
      </Container>
    </>
  );
};

export default LoginPage;
