import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Designer - Admin",
  description: "Admin panel for designer app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <div className=" h-screen w-screen flex">
          <Sidebar />
          <div className=" w-full overflow-y-auto lg:p-8 p-2 ">{children}</div>
        </div>
      </body>
    </html>
  );
}
