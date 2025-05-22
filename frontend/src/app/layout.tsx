import { Montserrat_Alternates } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";

const abril = Montserrat_Alternates({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atelje Nataša Beljin",
  description: "Atelje Nataša Beljin - Izrada i prodaja unikatnih slika",
  robots: { index: process.env.ENVIRONMENT !== "PRODUCTION" ? false : true },
};

console.log("ENVIRONMENT", process.env.ENVIRONMENT);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${abril.className}`}>
      <body className="antialiased h-screen grid lg:grid-cols-[1fr_4fr] grid-rows-[auto_1fr_auto]">
        <Header />
        <main className="bg-[rgb(24_24_24)] text-black lg:col-start-[2]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
