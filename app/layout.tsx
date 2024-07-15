import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./_components/navbar";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "health weather app",
  description: "Forecast COVID-19 prevalence",
  
  openGraph: {
    title: 'health weather appc',
    description: 'Forecast COVID-19 prevalence',
    url: 'https://health-weather-app-web.vercel.app/',
    siteName: 'health weather app',
    images: [
      {
        url: 'https://health-weather-app-web.vercel.app/metadata.png', // Must be an absolute URL
        width: 675,
        height: 450,
      }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'health weather app',
    description: 'Forecast COVID-19 prevalence',
    images: [{
      url: 'https://health-weather-app-web.vercel.app/metadata.png', // Must be an absolute URL
      width: 675,
      height: 450,
    }]
  }
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <div className="flex h-full pt-20">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
