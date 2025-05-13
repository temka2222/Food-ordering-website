import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { FoodType } from "@/app/(user)/_components/OrderHistory";
import axios from "axios";
import { toast } from "sonner";

export type OrdersTableType = {
  user: string;
  foodOrderItems: FoodType[];
  createdAt: string;
  totalPrice: number;
  address: string;
  status: "pending" | "delivered" | "canceled";
};

export function StatusColumn({ row }: { row: any }) {
  const [status, setStatus] = useState<string>(row.getValue("status"));

  const StatusChange = async (newStatus: string, orderId: string) => {
    setStatus(newStatus);
    console.log(status);
    try {
      const response = await axios.put(
        "http://localhost:3001/order/update-status",
        {
          orderId,
          status: newStatus,
        }
      );
      toast.success("amjilttai");
    } catch (error) {
      toast.error("error");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`capitalize ${
            status == "pending" ? "border-amber-400" : ""
          } ${status == "delivered" ? "border-emerald-500" : ""} ${
            status == "canceled" ? "border-red-400" : ""
          }`}
        >
          {status} <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => StatusChange("pending", row.original._id)}
        >
          Pending
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => StatusChange("delivered", row.original._id)}
        >
          Delivered
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => StatusChange("canceled", row.original._id)}
        >
          Canceled
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
