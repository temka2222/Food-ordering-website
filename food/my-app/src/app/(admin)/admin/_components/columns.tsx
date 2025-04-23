"use client";
import { FoodsType } from "@/app/(user)/page";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export type OrdersTableType = {
  user: string;
  food: FoodsType[];
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Customer",
    accessorKey: "_id",
  },
  {
    header: "Foods",
    cell: ({ row }) => {
      return (
        <ul className="list-disc pl-4">
          {row.original.food.map((item, i) => (
            <li key={i}>{item.name}</li>
          ))}
        </ul>
      );
    },
  },
  {
    header: "Date",
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
