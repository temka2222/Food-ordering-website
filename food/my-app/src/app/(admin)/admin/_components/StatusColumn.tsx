import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Row } from "@tanstack/react-table";
import { OrdersTableType } from "./columns";
import { api } from "@/app/axios";

export function StatusColumn({ row }: { row: Row<OrdersTableType> }) {
  const [status, setStatus] = useState<string>(row.getValue("status"));

  const StatusChange = async (newStatus: string, orderId: string) => {
    setStatus(newStatus);
    try {
      await api.put("/order/update-status", {
        orderId,
        status: newStatus,
      });
      toast.success("Амжилттай шинэчлэгдлээ");
    } catch (error) {
      console.error(error);
      toast.error("Алдаа гарлаа");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`capitalize ${
            status === "pending" ? "border-amber-400" : ""
          } ${status === "delivered" ? "border-emerald-500" : ""} ${
            status === "canceled" ? "border-red-400" : ""
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
