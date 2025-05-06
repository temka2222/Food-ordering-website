import { Header } from "../_components/Header";
import { Footer } from "../_components/Footer";
import { PropsWithChildren } from "react";
import { SelectedFoodProvider } from "./_components/SelectedFoodProvider";
import { Toaster } from "sonner";

export default function CustomerLayout({ children }: PropsWithChildren) {
  return (
    <SelectedFoodProvider>
      <Header />

      {children}
      <Footer />
    </SelectedFoodProvider>
  );
}
