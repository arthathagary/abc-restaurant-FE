"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { Toaster } from "../ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const CreateAccount = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const createAccount = async () => {
    // Handle account creation logic here
    console.log("formData", formData);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phoneNumber,
          role: "staff",
          address: "Colombo Branch",
        }
      );
      console.log("data", response.data);
      console.log("status", response.status);
      if (response.status === 201) {
        console.log("Account created successfully!");
        toast({
          title: "Account created successfully!",
          description: "Account created successfully for restaurant staffs.",
        });
        setIsOpen(false); // Close the dialog
        router.replace("/admin/dashboard");
      } else {
        console.error("Account creation failed!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant='default' onClick={() => setIsOpen(true)}>
            Create account for staffs
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create account</DialogTitle>
            <DialogDescription>
              Create a new account for restaurant staffs.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input
                id='name'
                value={formData.name}
                onChange={handleChange}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='phoneNumber' className='text-right'>
                Tel Number
              </Label>
              <Input
                id='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='email' className='text-right'>
                Email
              </Label>
              <Input
                id='email'
                value={formData.email}
                onChange={handleChange}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='password' className='text-right'>
                Password
              </Label>
              <Input
                id='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={createAccount}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateAccount;
