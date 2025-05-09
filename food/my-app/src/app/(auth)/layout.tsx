import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

export default function CustomerLayout({ children }: PropsWithChildren) {
  return (
    <div className="antialiased max-w-[1440px] m-auto h-full ">
      <Toaster position="top-right" />
      {children}
    </div>
  );
}
