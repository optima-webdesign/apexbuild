import { Inter, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// Optimized font loading with specific weights for that crisp editorial look
const inter = Inter({ 
  subsets: ["latin"], 
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({ 
  subsets: ["latin"], 
  weight: ['400', '500', '600', '700', '800'],
  variable: "--font-syne",
  display: "swap",
});

// Premium SEO Metadata
export const metadata = {
  title: "ApexBuild. | Premium Architecture & Engineering",
  description: "Building the future with modern engineering, high-end architecture, and unparalleled precision. We shape the spaces that shape you.",
  keywords: ["Architecture", "Construction", "Premium Building", "Industrial Engineering", "ApexBuild"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 1. bg-light sets the ultra-premium light gray background globally.
        2. selection:bg-accent selection:text-dark gives a beautiful custom highlight color when users select text.
      */}
      <body className={`${inter.variable} ${syne.variable} font-sans antialiased bg-light text-dark selection:bg-accent selection:text-dark flex flex-col min-h-screen`}>
        
        {/* Smooth Scroll Wrapper (Lenis/Locomotive) */}
        <SmoothScroll>
          
          <Navbar />
          
          {/* REMOVED pt-24: Individual pages now control their own padding for perfect edge-to-edge hero sections */}
          <main className="grow flex flex-col">
            {children}
          </main>
          
          <Footer />
          <WhatsAppButton />

        </SmoothScroll>
        
      </body>
    </html>
  );
}