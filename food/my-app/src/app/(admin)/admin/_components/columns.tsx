"use client";
import { useUser } from "@/app/(auth)/sign-up/_components/userValueProvider";
import { FoodsType } from "@/app/(user)/page";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type OrdersTableType = {
  user: string;
  foodOrderItems: FoodsType[];
  createdAt: string;
  totalPrice: number;
  address: string;
  status: "pending" | "delivered" | "canceled";
};
export const columns: ColumnDef<OrdersTableType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    header: "Customer",
    accessorKey: "user.email",
  },
  {
    header: "Foods",
    accessorFn: (row) => {
      return row.foodOrderItems.length;
    },
  },

  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "createdAt",
  },
  {
    header: "Total",
    accessorKey: "totalPrice",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
];
