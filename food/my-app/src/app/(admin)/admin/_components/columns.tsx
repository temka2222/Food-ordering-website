import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import { FoodType } from "@/app/(user)/_components/OrderHistory";
import { StatusColumn } from "./StatusColumn";

export type OrdersTableType = {
  user: string;
  foodOrderItems: FoodType[];
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const foodItems = row.original.foodOrderItems;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[265px] " align="end">
            {foodItems.map((item) => (
              <DropdownMenuItem className="w-full flex flex-row" key={item._id}>
                <div className="flex w-full gap-2 items-center">
                  <div className="w-1/3">
                    <img
                      src={item.food.image}
                      alt={item.food.foodName}
                      className="w-full h-auto object-cover rounded"
                    />
                  </div>
                  <div className="w-2/3">
                    <p className="text-sm font-medium">{item.food.foodName}</p>
                  </div>
                </div>
                <p>x{item.quantity}</p>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center"
        >
          Date
          <div className="flex flex-col ">
            <ChevronUp
              size={8}
              className={` ${
                column.getIsSorted() === "asc" ? "text-black" : "text-gray-400"
              }`}
            />
            <ChevronDown
              size={8}
              className={` ${
                column.getIsSorted() === "desc" ? "text-black" : "text-gray-400"
              }`}
            />
          </div>
        </Button>
      );
    },
    accessorFn: (row) => new Date(row.createdAt),
    id: "createdAt",
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = rowA.getValue<Date>(columnId).getTime();
      const dateB = rowB.getValue<Date>(columnId).getTime();
      return dateA - dateB;
    },
    cell: ({ row }) => {
      const date = row.getValue<Date>("createdAt");
      return date.toLocaleDateString();
    },
  },
  {
    header: "Total",
    accessorKey: "totalPrice",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center"
        >
          Status
          <div className="flex flex-col ">
            <ChevronUp
              size={8}
              className={` ${
                column.getIsSorted() === "asc" ? "text-black" : "text-gray-400"
              }`}
            />
            <ChevronDown
              size={8}
              className={` ${
                column.getIsSorted() === "desc" ? "text-black" : "text-gray-400"
              }`}
            />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => <StatusColumn row={row} />,
  },
];
