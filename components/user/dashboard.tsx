"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from "axios";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  quantity?: number;
}

export function Dashboard() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/menu`
        );
        // const itemsWithImages = await Promise.all(
        //   response.data.map(async (item: MenuItem) => {
        //     // const imageSrc = await fetchImage(item.imageUrl);
        //     return { ...item };
        //   })
        // );
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    // const fetchImage = async (imageName: string) => {
    //   try {
    //     const response = await axios.get(
    //       `${process.env.NEXT_PUBLIC_API_URL}/upload/${imageName}`,
    //       { responseType: "arraybuffer" }
    //     );
    //     const base64Image = Buffer.from(response.data, "binary").toString(
    //       "base64"
    //     );
    //     return `data:image/png;base64,${base64Image}`;
    //   } catch (error) {
    //     console.error("Error fetching image:", error);
    //     return null;
    //   }
    // };

    fetchMenuItems();
  }, []);

  const filteredMenuItems = useMemo(() => {
    let filtered = menuItems;
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [menuItems, selectedCategory, searchTerm]);

  const handleAddToCart = (item: any) => {
    const itemWithQuantity = { ...item, quantity: item.quantity || 1 };
    setCart([...cart, itemWithQuantity]);
    localStorage.setItem("cart", JSON.stringify([...cart, itemWithQuantity]));
  };

  const handleRemoveFromCart = (item: any) => {
    setCart(cart.filter((cartItem) => cartItem._id !== item._id));
  };

  const handleUpdateCartQuantity = (item: any, quantity: number) => {
    setCart(
      cart.map((cartItem) =>
        cartItem._id === item._id ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity!,
    0
  );

  const handleOrder = async ()=>{
    console.log("Ordering..."); 
    console.log("cart", cart);
    console.log(total)
    const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    console.log("user", user);
    console.log("user._id", user._id);
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      userId: user._id,
      items: cart,
      totalAmount: total
    })
    console.log("res", res);
  } else {
    console.log("No user found in localStorage");
  }
  }

  return (
    <div className='flex flex-col min-h-screen'>
      
      <main className='flex-1 py-8 px-6'>
        <div className='container mx-auto'>
          <div className='mb-6 flex justify-between items-center'>
            <div className='flex items-center gap-4'>
              <h1 className='text-3xl font-bold'>Our Menu</h1>
              <div className='flex items-center space-x-4'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline'>
                      {selectedCategory === "all"
                        ? "All Categories"
                        : selectedCategory}
                      <ChevronDownIcon className='ml-2 h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onSelect={() => setSelectedCategory("all")}
                    >
                      All Categories
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => setSelectedCategory("Appetizer")}
                    >
                      Appetizer
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setSelectedCategory("Main Course")}
                    >
                      Main Course
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setSelectedCategory("Desserts")}
                    >
                      Desserts
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setSelectedCategory("Beverage")}
                    >
                      Beverage
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className='relative flex-1'>
                  <Input
                    type='text'
                    placeholder='Search menu...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='pr-8'
                  />
                  <SearchIcon className='absolute right-2 top-1/2 -translate-y-1/2  text-muted-foreground' />
                </div>
              </div>
            </div>
            <div>
              <Button onClick={() => setShowCart(!showCart)} variant='default'>
                {showCart ? "Close Cart" : "View Cart"}
              </Button>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {filteredMenuItems.map((item) => (
              <Card key={item._id}>
                <div className='relative'>
                  <Image
                    src={process.env.NEXT_PUBLIC_API_URL + "/"+item.imageUrl || "/placeholder.svg"}
                    alt={item.description}
                    width={400}
                    height={300}
                    className='w-full h-48 object-cover rounded-t-lg'
                    style={{ aspectRatio: "400/300", objectFit: "cover" }}
                  />
                  <Button
                    size='icon'
                    variant='ghost'
                    className='absolute top-2 right-2'
                    onClick={() => handleAddToCart(item)}
                  >
                    <PlusIcon className='h-5 w-5' />
                    <span className='sr-only'>Add to cart</span>
                  </Button>
                </div>
                <CardContent className='p-4'>
                  <h3 className='text-lg font-bold mb-2'>{item.name}</h3>
                  <p className='text-muted-foreground mb-2'>
                    {item.description}
                  </p>
                  <div className='flex justify-between items-center'>
                    <span className='font-bold'>${item.price}</span>
                    <Badge variant='secondary'>{item.category}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      {showCart && (
        <Sheet open={showCart} onOpenChange={setShowCart}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
              <SheetDescription>Your added items.</SheetDescription>
            </SheetHeader>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className='space-y-4'>
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className='flex justify-between items-center'
                  >
                    <div className='flex items-center space-x-4'>
                      <Image
                        src={process.env.NEXT_PUBLIC_API_URL + "/"+item.imageUrl || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className='rounded-md'
                        style={{ aspectRatio: "64/64", objectFit: "cover" }}
                      />
                      <div>
                        <h3 className='font-bold'>{item.name}</h3>
                        <p className='text-muted-foreground'>
                          ${item.price} x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Button
                        size='icon'
                        variant='ghost'
                        onClick={() =>
                          handleUpdateCartQuantity(item, item.quantity! - 1)
                        }
                      >
                        <MinusIcon />
                        <span className='sr-only'>Decrease quantity</span>
                      </Button>
                      <Button
                        size='icon'
                        variant='ghost'
                        onClick={() =>
                          handleUpdateCartQuantity(item, item.quantity! + 1)
                        }
                      >
                        <PlusIcon c/>
                        <span className='sr-only'>Increase quantity</span>
                      </Button>
                      <Button
                        size='icon'
                        variant='ghost'
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        <Trash2Icon />
                        <span className='sr-only'>Remove from cart</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <SheetFooter className='block'>
              <div className='text-2xl mt-2 flex justify-end items-center mb-2'>
                <span className='font-bold'>Total:</span>
                <span className='font-bold'>
                  $
                  {cart.reduce(
                    (total, item) => total + item.price * item.quantity!,
                    0
                  )}
                </span>
              </div>
              <br />
              <SheetClose asChild className=''>
                <Button onClick={handleOrder} type='submit' className=' w-full flex justify-center '>
                  Order
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
      {notification && <div />}
    </div>
  );
}

function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m6 9 6 6 6-6' />
    </svg>
  );
}

function MinusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M5 12h14' />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M5 12h14' />
      <path d='M12 5v14' />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
}

function Trash2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M3 6h18' />
      <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
      <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
      <line x1='10' x2='10' y1='11' y2='17' />
      <line x1='14' x2='14' y1='11' y2='17' />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M18 6 6 18' />
      <path d='m6 6 12 12' />
    </svg>
  );
}
