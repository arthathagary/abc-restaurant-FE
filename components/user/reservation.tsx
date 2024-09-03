"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarDaysIcon, Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Reservation() {
  const [reservationDate, setReservationDate] = useState(null);
  const [reservationTime, setReservationTime] = useState(null);
  const [status, setStatus] = useState("pending");
  const [numGuests, setNumGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Reservation Management</CardTitle>
        <CardDescription>
          Fill out the form to manage your reservation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='grid gap-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='reservation-date'>Reservation Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-full justify-start font-normal'
                  >
                    {reservationDate
                      ? reservationDate.toLocaleDateString()
                      : "Select date"}
                    <div className='ml-auto h-4 w-4 opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    value={reservationDate}
                    onValueChange={setReservationDate}
                    required
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='reservation-time'>Reservation Time</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-full justify-start font-normal'
                  >
                    {reservationTime
                      ? reservationTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Select time"}
                    <div className='ml-auto h-4 w-4 opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <div />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='status'>Status</Label>
            <Select
              value={status}
              onValueChange={setStatus}
              className='w-full'
              required
            >
              <SelectTrigger>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='confirmed'>Confirmed</SelectItem>
                <SelectItem value='canceled'>Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='num-guests'>Number of Guests</Label>
            <Input
              id='num-guests'
              type='number'
              min='1'
              value={numGuests}
              onChange={(e) => setNumGuests(Number(e.target.value))}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='special-requests'>Special Requests</Label>
            <Textarea
              id='special-requests'
              placeholder='Enter any special requests...'
              maxLength={500}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
            />
          </div>
          <Button type='submit' className='w-full'>
            Save Reservation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
