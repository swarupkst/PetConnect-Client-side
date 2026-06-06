import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar/page";
import Footer from "@/components/shared/Footer/page";
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PetConnect",
  description: "Find Your Perfect Pet",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        

          <Navbar />
          <Toaster position="top-right" />

          <main className="grow bg-gray-50 dark:bg-gray-900 transition-colors">
            {children}
          </main>

          <Footer />
    

      </body>
    </html>
  );
}