"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import reataurantImg from "@/public/restraurant.jpg";

import axios from "axios";

interface LoginProps{
  isUser? : boolean;
}

export function Login({isUser}: LoginProps) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setIsEmailValid(email.includes("@"));
    setIsPasswordValid(password.length >= 6);
  }, [email, password]);

  /**
   * Handles the login click event by sending a POST request to the server's login API.
   *
   * @return {Promise<void>} A promise that resolves when the login request is complete.
   */ const handleLoginClick = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      console.log("data", response.data);
      console.log("status", response.status);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // onLogin(); // Update the isLogin state in the Admin component

        const role = response.data.user.role;
        console.log("role", role);
        if (role === "admin") {
          router.replace("/admin/dashboard");
        } else if (role === "staff") {
          router.replace("/staff");
        } else {
          router.replace("/user");
        }
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log("error data", error.response.data);
          console.log("error status", error.response.status);
          setErrorMsg(error.response.data.error);
          console.log("error message", error.response.data.error);
          localStorage.removeItem("token");
        }
      } else if (error instanceof Error) {
        console.log("error message", error.message);
      } else {
        console.log("unexpected error", error);
      }
    }
  };

  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Login</h1>
            <p className='text-balance text-muted-foreground'>
              Enter your email below to login to your account
            </p>
          </div>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailTouched(true);
                }}
              />
              {emailTouched && !isEmailValid && (
                <p id='email-error' className='text-red-500'>
                  Please enter a valid email address
                </p>
              )}
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                {/* <Link
                  href='/forgot-password'
                  className='ml-auto inline-block text-sm underline'
                >
                  Forgot your password?
                </Link> */}
              </div>
              <Input
                id='password'
                type='password'
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordTouched(true);
                }}
              />
              {passwordTouched && !isPasswordValid && (
                <p id='password-error' className='text-red-500'>
                  Password must be at least 6 characters
                </p>
              )}
            </div>
            {errorMsg && (
              <p className='text-center' style={{ color: "red" }}>
                {errorMsg}
              </p>
            )}
            <Button
              type='submit'
              className='w-full'
              onClick={handleLoginClick}
              disabled={!isEmailValid || !isPasswordValid}
            >
              Login
            </Button>
          </div>
          {isUser && (
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{" "}
            <Link href='/register' className='underline'>
              Sign up
            </Link>
          </div>)}
        </div>
      </div>
      <div className='hidden bg-muted lg:block'>
        <Image
          src={reataurantImg}
          alt='Image'
          width='1920'
          height='1080'
          className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  );
}
