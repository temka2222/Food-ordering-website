import { Header } from "../_components/Header";
import { Footer } from "../_components/Footer";
import { PropsWithChildren } from "react";

export default function CustomerLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="max-w-[1440px] m-auto h-fit">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
