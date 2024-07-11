import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
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
        <div className=" h-screen w-screen flex">
          <Sidebar />
          <div className=" w-full overflow-y-auto lg:p-8 p-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
