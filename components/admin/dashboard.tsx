"use client";
import { useEffect, useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import CreateAccount from "./createAccount";
import { Toaster } from "../ui/toaster";
import axios from "axios";
import ReusableCard from "./ReusableCard";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Order {
  _id: string;
  userId: string;
  items: string[];
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

async function fetchUsers() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

async function fetchOrders() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
    return res.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

async function fetchReservations() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reservations`);
    return res.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

async function deleteUser(userId: string) {
  console.log("Deleting user with id:", userId);
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

export function Dashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalAmountSum, setTotalAmountSum] = useState(0);
  const [reservationDataLen, setReservationDataLen] = useState(0);
  const [userDataLen, setUserDataLen] = useState(0);
  const [reservationData, setReservationData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersData, ordersData, reservationData] = await Promise.all([
          fetchUsers(),
          fetchOrders(),
          fetchReservations(),
        ]);
        const userWithoutPassword = usersData.map((user: User) => ({
          ...user,
          password: null,
        }));
        setUsers(
          userWithoutPassword.filter((user: User) => user.role !== "admin")
        );
        setOrders(ordersData);
        let totalAmountSum = 0;

        ordersData.forEach((order: any) => {
          totalAmountSum += order.totalAmount;
          setTotalAmountSum(totalAmountSum);
        });

        setReservationData(reservationData);
        setReservationDataLen(reservationData.length);
        setUserDataLen(usersData.length);
        console.log("Total Amount Sum:", reservationData.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <div className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              prefetch={false}
            >
              <div className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Restaurant Name</span>
            </Link>
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-foreground"
                prefetch={false}
              >
                <div className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <div className="h-5 w-5" />
                User Management
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <div className="h-5 w-5" />
                Reservations
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <div className="h-5 w-5" />
                Menu & Services
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <div className="h-5 w-5" />
                Offers
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <div className="h-5 w-5" />
                Content Management
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <div className="h-5 w-5" />
                Queries
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <div className="h-5 w-5" />
                Reports
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <div className="h-5 w-5" />
                Payments
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <div className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#" prefetch={false}>
                  Dashboard
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="relative ml-auto flex-1 md:grow-0">
          <div className="absolute left-2.5 top-2.5 h-4 w-5 text-muted-foreground" />
          {/* <Input
            type='search'
            placeholder='Search...'
            className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
          /> */}
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="rounded-full">
            <div className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/placeholder.svg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                  style={{ aspectRatio: "36/36", objectFit: "cover" }}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Admin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem  onClick={()=>{
                localStorage.clear();
                router.replace('/')
              }}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Dashboard</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Get an overview of your restaurants performance, reservations,
                and customer activity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                <ReusableCard
                  title="Todays Revenue"
                  valueOfCard={`$${totalAmountSum}`}
                  progress={15}
                  data={orders}
                />
                <ReusableCard
                  title="Reservations"
                  valueOfCard={`+${reservationDataLen.toString()}`}
                  progress={10}
                  data={reservationData}
                />
                <ReusableCard
                  title="Users"
                  valueOfCard={`+${(userDataLen-1).toString()}`}
                  progress={20}
                  data={users}
                />
                {/* <ReusableCard
                  title="Average Rating"
                  valueOfCard="4.8"
                  progress={5}
                /> */}
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="px-7">
              <div className="flex justify-between">
                <CardTitle>User Management</CardTitle>
                <CreateAccount />
              </div>
              <CardDescription>
                Manage your restaurants staff and customers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Role</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Status
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Address
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user: User) => (
                    <TableRow key={user._id} className="bg-accent">
                      <TableCell>
                        <div className="font-medium">{user.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {user.role}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="secondary">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {user.address}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="outline"
                            >
                              <div>
                                <Ellipsis />
                              </div>
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
                            <DropdownMenuItem onClick={() => handleDeleteUser(user._id)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {/* <Card x-chunk='dashboard-01-chunk-2'>
            <CardHeader className='px-7'>
              <CardTitle>Reservations</CardTitle>
              <CardDescription>
                Manage your restaurants reservations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4'>
                <div />
              </div>
            </CardContent>
          </Card> */}
        </div>
      </main>
      <Toaster />
    </div>
  );
}