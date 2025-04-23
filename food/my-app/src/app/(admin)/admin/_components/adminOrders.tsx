"use client";
import { useEffect, useState } from "react";
import { OrdersTableType, columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ];
// }

export const OrderTable = () => {
  const [data, setData] = useState<OrdersTableType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const getCategory = async () => {
    const response = await axios.get("http://localhost:3001/order");
    setData(response.data.orders);
    console.log("table", response);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="container mx-auto py-10 bg-white">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
