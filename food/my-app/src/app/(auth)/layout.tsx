import { PropsWithChildren } from "react";

export default function CustomerLayout({ children }: PropsWithChildren) {
  return (
    <body className="antialiased max-w-[1440px] m-auto h-full ">
      {children}
    </body>
  );
}
