"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { CircleCheck, CircleX } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ReservationProps {
  isStaff?: boolean;
}

export function ViewQuery({ isStaff }: ReservationProps) {
  const router = useRouter();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (userString) {
          const user = JSON.parse(userString);
          const userId = user._id;
          const reservationEndpoint = isStaff ? "/queries" : `/queries/${userId}`;

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

  
  const handleResponseChange = (id, response) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation._id === id ? { ...reservation, response } : reservation
      )
    );
  };

  const handleResponseSubmit = async (id, response) => {
    console.log("Submitting response:", response);
    console.log("ID:", id);
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/queries/${id}`, { response , status: "resolved" });
      router.refresh();
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8 sm:pl-14">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-center mb-6">Queries</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {isStaff && <TableHead>User Email</TableHead> }
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              
               <TableHead>Response</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation._id}>
                {isStaff && <TableCell>{reservation.userEmail ? reservation.userEmail : ""}</TableCell>}
                <TableCell>{reservation.subject}</TableCell>
                <TableCell>{reservation.message}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                {!isStaff && <TableCell>{reservation.response ? reservation.response : 'Waiting for response'}</TableCell>}
                
                {isStaff && (
                  <TableCell>
                    <Textarea
                      value={reservation.response || ""}
                      onChange={(e) => handleResponseChange(reservation._id, e.target.value)}
                      placeholder="Enter your response here"
                    />
                    <Button
                      onClick={() => handleResponseSubmit(reservation._id, reservation.response)}
                    >
                      Submit Response
                    </Button>
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