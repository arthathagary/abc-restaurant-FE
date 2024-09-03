"use client";
import { PlusIcon, CalendarIcon } from "lucide-react";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface ReusableCardProps {
  title: string;
  count: number;
  btnText: string;
  description?: string;
}
const ReusableCard = ({
  title,
  count,
  btnText,
  description,
}: ReusableCardProps) => {
  const router = useRouter();
  const handlePlusBtnClick = () => {
    router.push(`staff/add${title.toLowerCase().replace(/\s+/g, "")}`);
  };

  const handleViewBtnClick = () => {
    router.push(`staff/view${title.toLowerCase().replace(/\s+/g, "")}`);
  };
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-3'>
        <CardTitle>{title}</CardTitle>
        {/* <Button onClick={handlePlusBtnClick} size='icon' variant='outline'>
          <PlusIcon className='h-4 w-4' />
          <span className='sr-only'>New Reservation</span>
        </Button> */}
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-between'>
          <div className='text-4xl font-bold'>{count}</div>
          {/* <div className='flex items-center gap-1 text-sm text-muted-foreground'>
            <CalendarIcon className='h-4 w-4' />
            Today
          </div> */}
        </div>
        <div className='text-sm text-muted-foreground'>{description}</div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleViewBtnClick}
          variant='outline'
          size='sm'
          className='w-full'
        >
          {btnText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReusableCard;
