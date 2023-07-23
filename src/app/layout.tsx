import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import AuthContext from "./AuthContext";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NutriTracker",
  description: "Nutrition Tracker",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ConvexClientProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full flex">
              <Navbar />
            </div>
            {children}
          </ConvexClientProvider>
        </AuthContext>
      </body>
    </html>
  );
}
