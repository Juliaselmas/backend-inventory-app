"use client"; // Markera filen som en Client Component

import { Inter } from "next/font/google";
import "./globals.css";
import ClientBootstrap from "./ClientBootstrap"; // Uppdatera om du har en "components"-mapp
import { AuthProvider } from "@/context/auth";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
/*
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <ClientBootstrap /> {// Här inkluderas Bootstrap på klientsidan }
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
*/


/*
export const metadata = {
  title: "Inventory Application",
  description: "",
};
*/