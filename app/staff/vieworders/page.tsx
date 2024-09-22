"use client";
import { OrderCard } from '@/components/user/order';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


interface Order {
    _id: string;
    [key: string]: any;
  }

const Page = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userString = localStorage.getItem('user');
        if (userString) {
          const user = JSON.parse(userString);
          const userId = user._id;
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
          setOrders(response.data);
          console.log(response.data)
        } else {
          console.error('No user found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4 pl-14">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} isStaff />
      ))}
    </div>
  );
};

export default Page;