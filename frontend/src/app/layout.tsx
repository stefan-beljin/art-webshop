import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen lg:grid lg:grid-cols-[1fr_4fr] grid-rows-[1fr_auto]`}
      >
        <Header />
        <main className="col-start-[2]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
