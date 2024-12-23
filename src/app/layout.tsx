import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavigationBar from "@/components/navigation-bar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MenusCollective",
  description: "Collection of online menus from around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-mono antialiased px-6 py-10`}
      >
        <main className="w-full flex items-center justify-center">
          {children}
        </main>
        <NavigationBar />
      </body>
    </html>
  );
}
