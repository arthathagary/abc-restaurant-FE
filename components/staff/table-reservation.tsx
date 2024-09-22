"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarIcon, Clock, PlusCircle, CircleCheck, CircleX } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ReservationProps {
  isStaff?: boolean;
}

export function TableReservation({ isStaff }: ReservationProps) {
  const router = useRouter();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (userString) {
          const user = JSON.parse(userString);
          const userId = user._id;
          const reservationEndpoint = isStaff ? "/reservations" : `/reservations/${userId}`;

          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/${reservationEndpoint}`
          );
          setReservations(response.data);
          console.log("Fetched reservations:", response.data);
        } else {
          console.error("No user found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const [newReservation, setNewReservation] = useState({
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReservation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = reservations.length + 1;
    const status = "Pending";
    setReservations((prev) => [...prev, { id, status, ...newReservation }]);
    setNewReservation({ date: "", time: "", guests: "", specialRequests: "" });

    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      const userId = user._id;
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reservations`,
        { userId: userId, status, ...newReservation }
      );
      router.refresh();
      console.log(res.data);
    } else {
      console.error("No user found in localStorage");
    }

    setIsDialogOpen(false);
    console.log("New reservation added:", { id, status, ...newReservation });
    console.log("All reservations:", reservations);
  };

  const handleStatusUpdate = async (id, newStatus,reservation) => {
    reservation.status = newStatus;
    console.log("Updating reservation status:", id, newStatus, "-->", reservation);

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/reservations/${id}`, reservation);
      // setReservations((prev) =>
      //   prev.map((reservation) =>
      //     reservation.id === id ? { ...reservation, status: newStatus } : reservation
      //   )
      // );
      router.refresh();
    } catch (error) {
      console.error("Error updating reservation status:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8 sm:pl-14">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-center mb-6">
          Table Reservations
        </h1>
        {!isStaff && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                Add Reservation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Reservation</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={newReservation.date}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={newReservation.time}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select
                    name="guests"
                    value={newReservation.guests}
                    onValueChange={(value) =>
                      handleInputChange({ target: { name: "guests", value } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Request</Label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={newReservation.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Enter any special requests here"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Add Reservation
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {isStaff && <TableHead>Email</TableHead>}
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Special Request</TableHead>
              {isStaff && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation._id}>
                {isStaff && <TableCell>{reservation.userEmail ? reservation.userEmail : ""}</TableCell>}
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{reservation.time}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                <TableCell>{reservation.guests}</TableCell>
                <TableCell>{reservation.specialRequests}</TableCell>
                {isStaff && (
                  <TableCell className="flex align-middle gap-2 cursor-pointer">
                    <div
                      className="text-sm hover:text-green-400"
                      onClick={() => handleStatusUpdate(reservation._id, "confirmed",reservation)}
                    >
                      <CircleCheck />
                    </div>
                    <div className="text-sm hover:text-red-400"
                     onClick={() => handleStatusUpdate(reservation._id, "canceled",reservation)}
                    >
                      <CircleX />
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}