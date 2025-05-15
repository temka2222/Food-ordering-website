"use client";
import { PropsWithChildren } from "react";
import { Menu } from "./admin/_components/adminMenu";
import { ShieldUser } from "lucide-react";
import { SelectedMenuProvider } from "./admin/_components/selectedMenuProvider";
import { Toaster } from "@/components/ui/sonner";
import { useUser } from "../(auth)/sign-up/_components/userValueProvider";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }: PropsWithChildren) {
  const { user, signOut } = useUser();
  const router = useRouter();

  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <a
          href="/log-in"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Энд дарж нэвтэрнэ үү
        </a>
      </div>
    );
  }
  if (!user || user.role !== "admin") {
    router.push("./log-in");
  }

  return (
    <SelectedMenuProvider>
      <div className="w-full flex h-screen max-w-[1440px] bg-[#E4E4E7] ">
        <Menu />
        <div className="flex-1 flex flex-col ">
          <div className="flex justify-end pr-18 pl-10 pt-6 pb-6">
            <div className="group relative p-2 rounded-xl">
              <button className="bg-red-500 p-2 rounded-full">
                <ShieldUser />
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 flex flex-col p-4 gap-2 bg-white border border-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                <p>{user?.email}</p>

                <button
                  className="flex flex-col justify-center items-center rounded-xl bg-gray-100"
                  onClick={() => signOut()}
                >
                  sign out
                </button>
              </div>
            </div>
          </div>
          <Toaster position="top-right" />
          <div className="flex-1 overflow-y-auto ">{children}</div>
        </div>
      </div>
    </SelectedMenuProvider>
  );
}
