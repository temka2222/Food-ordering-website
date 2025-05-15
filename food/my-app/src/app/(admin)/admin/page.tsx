"use client";

import { AdminCategories } from "./_components/adminCategories";

import { useSelectedMenu } from "@/app/(admin)/admin/_components/selectedMenuProvider";
import { OrderTable } from "./_components/adminOrders";

export default function Home() {
  const { selectedMenu } = useSelectedMenu();

  return (
    <div className="w-full min-h-screen bg-[#E4E4E7] pr-10 pl-10 pt-6 pb-6">
      {selectedMenu === "food-menu" && <AdminCategories />}
      {selectedMenu === "orders" && <OrderTable />}
    </div>
  );
}
