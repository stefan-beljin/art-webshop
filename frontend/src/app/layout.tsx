import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";

const abril = Montserrat_Alternates({ weight: "500", subsets: ["latin"] });

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
