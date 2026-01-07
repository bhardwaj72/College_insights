import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import localFont from "next/font/local";

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

const inter = localFont({
  src: [
    { path: "../../public/fonts/inter/Inter_18pt-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/inter/Inter_18pt-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/inter/Inter_18pt-SemiBold.ttf", weight: "600" },
    { path: "../../public/fonts/inter/Inter_18pt-Bold.ttf", weight: "700" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const poppins = localFont({
  src: [
    { path: "../../public/fonts/poppins/Poppins-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/poppins/Poppins-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/poppins/Poppins-SemiBold.ttf", weight: "600" },
    { path: "../../public/fonts/poppins/Poppins-Bold.ttf", weight: "700" },
  ],
  variable: "--font-heading",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} antialiased min-h-screen flex flex-col bg-[#F8FAFB]`}>
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
