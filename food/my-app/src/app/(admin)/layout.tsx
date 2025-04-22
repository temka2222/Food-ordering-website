import { PropsWithChildren } from "react";
import { Menu } from "./admin/_components/adminMenu";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row">
      <Menu />
      <div className=" max-w-[1440px] m-auto ">{children}</div>
    </div>
  );
}
