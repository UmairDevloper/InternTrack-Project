import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";



export const metadata: Metadata = {
  title: "InterTrack App",
  description: "Track your internship applications and interviews with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en">
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
