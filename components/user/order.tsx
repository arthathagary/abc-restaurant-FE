"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";

interface OrderProps {
  key: string;
  [key: string]: any;
  isStaff?: boolean;
}

export function OrderCard({ order, isStaff }: OrderProps) {
  const router = useRouter();
  // console.log(order._id, "inside order card");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAcceptOrder = async (orderId: string,orderStatus:string) => {
    try {
      const { items, userId, ...orderWithoutItemsAndUserId } = order;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...orderWithoutItemsAndUserId, orderStatus: orderStatus }),
      });

      if (response.ok) {
        // Update the order status locally if needed
        order.orderStatus = orderStatus;
        router.refresh();
      } else {
        console.log('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('An error occurred while updating the order status');
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Order #{order._id}</span>
          <div>
          <p className="text-sm font-normal">{order.userEmail}</p>
          <p className="text-sm font-normal">{order.userAddress}</p>
          </div>

        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="font-semibold">Total Amount:</p>
            <p className="text-2xl font-bold">${order.totalAmount.toFixed(2)}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="secondary">{order.orderStatus}</Badge>
          </div>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="items">
            <AccordionTrigger>
              <span className="font-semibold">Order Items ({order.items.length})</span>
            </AccordionTrigger>
            <AccordionContent>
              {order.items.map((item: any) => (
                <div key={item.id} className="flex gap-4 mb-4 pb-4 border-b last:border-b-0">
                  <Image
                    src={process.env.NEXT_PUBLIC_API_URL + "/"+item.imageUrl}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="text-sm mt-1">{item.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-semibold">${item.price.toFixed(2)} x {item.quantity}</p>
                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {isStaff && (
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={() => handleAcceptOrder(order._id,"completed")}>Accept Order</Button>
            <Button variant="destructive" onClick={() => handleAcceptOrder(order._id,"canceled")} >Reject Order</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}