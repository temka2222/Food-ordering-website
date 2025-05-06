import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ReactNode } from "react";
import { DilaogPic } from "./DialogPic";
type DialogPropsType = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
};

export const UserDialog = ({
  isOpen,
  onClose,
  title,
  description,
}: DialogPropsType) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col  items-center">
        <DialogHeader>
          <DialogTitle className="flex  justify-center">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DilaogPic />
        <DialogClose className="mt-4">Close</DialogClose>
      </DialogContent>
    </Dialog>
  );
};
