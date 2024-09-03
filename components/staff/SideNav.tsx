import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Package2Icon,
  CalendarIcon,
  MessageCircleIcon,
  ReceiptIcon,
  CreditCardIcon,
  UsersIcon,
  BarChartIcon,
  BellIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const SideNav = () => {
  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
        <TooltipProvider>
          <Link
            href='#'
            className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
            prefetch={false}
          >
            <Package2Icon className='h-4 w-4 transition-all group-hover:scale-110' />
            <span className='sr-only'>Acme Hospitality</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                prefetch={false}
              >
                <CalendarIcon className='h-5 w-5' />
                <span className='sr-only'>Reservations</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Reservations</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                prefetch={false}
              >
                <MessageCircleIcon className='h-5 w-5' />
                <span className='sr-only'>Queries</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Queries</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                prefetch={false}
              >
                <ReceiptIcon className='h-5 w-5' />
                <span className='sr-only'>Orders</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Orders</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                prefetch={false}
              >
                <CreditCardIcon className='h-5 w-5' />
                <span className='sr-only'>Payments</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Payments</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                prefetch={false}
              >
                <UsersIcon className='h-5 w-5' />
                <span className='sr-only'>Customers</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Customers</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                prefetch={false}
              >
                <BarChartIcon className='h-5 w-5' />
                <span className='sr-only'>Reporting</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Reporting</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                prefetch={false}
              >
                <BellIcon className='h-5 w-5' />
                <span className='sr-only'>Notifications</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Notifications</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                prefetch={false}
              >
                <SettingsIcon className='h-5 w-5' />
                <span className='sr-only'>Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default SideNav;
