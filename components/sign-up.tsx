"use client"
import { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios';

export const description =
  "A sign up form with name, email, password, phone, and address fields inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

export function SignUpForm() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'customer',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch('http://localhost:8080/api/v1/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        formData
      );

      if (response.status === 200 || response.status === 201) {
        console.log("data", response.data); 
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // onLogin(); // Update the isLogin state in the Admin component

        const role = response.data.role;
        if (role === "admin") {
          router.push("/admin");
        } else if (role === "staff") {
          router.push("/staff");
        } else {
          router.push("/user");
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
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="123-456-7890"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="123 Main St, City, Country"
              required
              value={formData.address}
              onChange={handleChange}
            />
            {errorMsg && (
              <p className='text-center' style={{ color: "red" }}>
                {errorMsg}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
         
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}