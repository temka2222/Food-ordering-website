"use client";
import { useEffect, useState } from "react";
import { OrdersTableType, columns } from "./columns";
import { DataTable } from "./data-table";
import { Calendar } from "lucide-react";
import { api } from "@/app/axios";

export const OrderTable = () => {
  const [data, setData] = useState<OrdersTableType[]>([]);
  const getOrders = async () => {
    const response = await api.get("/order");
    setData(response.data.orders);
  };

  useEffect(() => {
    getOrders();
  }, []);
  const dates = data.map((order) => new Date(order.createdAt));

  const minDate =
    dates.length > 0
      ? new Date(Math.min(...dates.map((d) => d.getTime())))
      : null;
  const maxDate =
    dates.length > 0
      ? new Date(Math.max(...dates.map((d) => d.getTime())))
      : null;
  return (
    <div className="container mx-auto py-10 bg-white rounded-xl px-2">
      <div className=" w-full flex flex-row justify-between items-center">
        <div className="flex flex-col p-2">
          <p className="font-medium text-xl">Orders</p>
          <p className="text-[#71717A]">{data.length} items</p>
        </div>
        <div className="flex flex-row gap-3 p-2">
          <div className="rounded-xl h-9 w-50 flex flex-row border border-solid items-center">
            <Calendar size={18} />
            <div className="flex flex-row gap-2 text-sm text-gray-600 items-center">
              <span>{minDate ? minDate.toLocaleDateString() : "N/A"}</span>
              <span>-</span>
              <span>{maxDate ? maxDate.toLocaleDateString() : "N/A"}</span>
            </div>
          </div>
          <div className="rounded-xl px-4 h-9 bg-[#c8c8ce] flex items-center">
            Change delivery state
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
