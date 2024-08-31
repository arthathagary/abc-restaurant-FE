import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarIcon } from "@/components/ui/calendar";
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

export function Dashboard() {
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
        <Sheet>
          <SheetTrigger asChild>
            <Button size='icon' variant='outline' className='sm:hidden'>
              <div className='h-5 w-5' />
              <span className='sr-only'>Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='sm:max-w-xs'>
            <Link
              href='#'
              className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
              prefetch={false}
            >
              <div className='h-5 w-5 transition-all group-hover:scale-110' />
              <span className='sr-only'>Restaurant Name</span>
            </Link>
            <nav className='grid gap-6 text-lg font-medium'>
              <Link
                href='#'
                className='flex items-center gap-4 px-2.5 text-foreground'
                prefetch={false}
              >
                <div className='h-5 w-5' />
                Dashboard
              </Link>
              <Link
                href='#'
                className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                prefetch={false}
              >
                <div className='h-5 w-5' />
                User Management
              </Link>
              <Link
                href='#'
                className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                prefetch={false}
              >
                <div className='h-5 w-5' />
                Reservations
              </Link>
              <Link
                href='#'
                className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                prefetch={false}
              >
                <div className='h-5 w-5' />
                Menu & Services
              </Link>
              <Link
                href='#'
                className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                prefetch={false}
              >
                <div className='h-5 w-5' />
                Offers
              </Link>
              <Link
                href='#'
                className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                prefetch={false}
              >
                <div className='h-5 w-5' />
                Content Management
              </Link>
              <Link
                href='#'
                className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                prefetch={false}
              >
                <div className='h-5 w-5' />
                Queries
              </Link>
              <Link
                href='#'
                className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                prefetch={false}
              >
                <div className='h-5 w-5' />
                Reports
              </Link>
              <Link
                href='#'
                className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                prefetch={false}
              >
                <div className='h-5 w-5' />
                Payments
              </Link>
              <Link
                href='#'
                className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                prefetch={false}
              >
                <div className='h-5 w-5' />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Breadcrumb className='hidden md:flex'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='#' prefetch={false}>
                  Dashboard
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='relative ml-auto flex-1 md:grow-0'>
          <div className='absolute left-2.5 top-2.5 h-4 w-5 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search...'
            className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
          />
        </div>
        <div className='flex items-center gap-2'>
          <Button size='icon' variant='ghost' className='rounded-full'>
            <div className='h-5 w-5' />
            <span className='sr-only'>Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='overflow-hidden rounded-full'
              >
                <Image
                  src='/placeholder.svg'
                  width={36}
                  height={36}
                  alt='Avatar'
                  className='overflow-hidden rounded-full'
                  style={{ aspectRatio: "36/36", objectFit: "cover" }}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Admin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
        <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
          <Card x-chunk='dashboard-01-chunk-0'>
            <CardHeader className='pb-3'>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription className='max-w-lg text-balance leading-relaxed'>
                Get an overview of your restaurants performance, reservations,
                and customer activity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardDescription>Todays Revenue</CardDescription>
                    <CardTitle className='text-4xl'>$2,345</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-xs text-muted-foreground'>
                      +15% from last week
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress value={15} aria-label='15% increase' />
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardDescription>Reservations</CardDescription>
                    <CardTitle className='text-4xl'>+24</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-xs text-muted-foreground'>
                      +10% from last week
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress value={10} aria-label='10% increase' />
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardDescription>New Customers</CardDescription>
                    <CardTitle className='text-4xl'>+18</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-xs text-muted-foreground'>
                      +20% from last week
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress value={20} aria-label='20% increase' />
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardDescription>Average Rating</CardDescription>
                    <CardTitle className='text-4xl'>4.8</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-xs text-muted-foreground'>
                      +5% from last week
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress value={5} aria-label='5% increase' />
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-01-chunk-1'>
            <CardHeader className='px-7'>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage your restaurants staff and customers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className='hidden sm:table-cell'>Role</TableHead>
                    <TableHead className='hidden sm:table-cell'>
                      Status
                    </TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Last Login
                    </TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className='bg-accent'>
                    <TableCell>
                      <div className='font-medium'>John Doe</div>
                      <div className='hidden text-sm text-muted-foreground md:inline'>
                        john@restaurant.com
                      </div>
                    </TableCell>
                    <TableCell className='hidden sm:table-cell'>
                      Manager
                    </TableCell>
                    <TableCell className='hidden sm:table-cell'>
                      <Badge className='text-xs' variant='secondary'>
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      2023-06-23
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup='true'
                            size='icon'
                            variant='ghost'
                          >
                            <div className='h-4 w-4' />
                            <span className='sr-only'>Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className='font-medium'>Jane Smith</div>
                      <div className='hidden text-sm text-muted-foreground md:inline'>
                        jane@restaurant.com
                      </div>
                    </TableCell>
                    <TableCell className='hidden sm:table-cell'>
                      Server
                    </TableCell>
                    <TableCell className='hidden sm:table-cell'>
                      <Badge className='text-xs' variant='outline'>
                        Inactive
                      </Badge>
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      2023-06-24
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup='true'
                            size='icon'
                            variant='ghost'
                          >
                            <div className='h-4 w-4' />
                            <span className='sr-only'>Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Activate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className='font-medium'>Michael Johnson</div>
                      <div className='hidden text-sm text-muted-foreground md:inline'>
                        michael@restaurant.com
                      </div>
                    </TableCell>
                    <TableCell className='hidden sm:table-cell'>Host</TableCell>
                    <TableCell className='hidden sm:table-cell'>
                      <Badge className='text-xs' variant='secondary'>
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      2023-06-25
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup='true'
                            size='icon'
                            variant='ghost'
                          >
                            <div className='h-4 w-4' />
                            <span className='sr-only'>Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className='font-medium'>Emily Davis</div>
                      <div className='hidden text-sm text-muted-foreground md:inline'>
                        emily@restaurant.com
                      </div>
                    </TableCell>
                    <TableCell className='hidden sm:table-cell'>
                      Server
                    </TableCell>
                    <TableCell className='hidden sm:table-cell'>
                      <Badge className='text-xs' variant='secondary'>
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      2023-06-26
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup='true'
                            size='icon'
                            variant='ghost'
                          >
                            <div className='h-4 w-4' />
                            <span className='sr-only'>Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-01-chunk-2'>
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
          </Card>
        </div>
      </main>
    </div>
  );
}
