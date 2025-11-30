import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import { Inter, Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "College Insights - Honest College Reviews & Rankings",
  description: "Discover authentic college reviews, compare top Indian colleges, and make informed decisions about your education. Real student insights, placement data, and campus reviews.",
  keywords: "college reviews, engineering colleges, MBA colleges, college rankings, placements, campus life",
  authors: [{ name: "College Insights Team" }],
  openGraph: {
    title: "College Insights - Your College Discovery Platform",
    description: "Zomato for Colleges - Authentic reviews, ratings, and insights from real students",
    type: "website",
    locale: "en_IN",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} antialiased min-h-screen flex flex-col bg-[#F8FAFB]`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
