import "./globals.css";
import dynamic from "next/dynamic";
import { Inter, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import { ROOT_METADATA } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { clinicSchema, localBusinessSchema } from "@/lib/schema";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/footer/Footer";
import { HashCleanup } from "@/components/layout/HashCleanup";

const CtaBanner = dynamic(
  () =>
    import("@/components/sections/cta-banner/CtaBanner").then(
      (mod) => mod.CtaBanner
    ),
  { ssr: true }
);

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata = ROOT_METADATA;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable, playfair.variable)}
    >
      <body className="bg-background text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-9999 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <JsonLd data={clinicSchema()} />
        <JsonLd data={localBusinessSchema()} />
        <HashCleanup />
        <Navbar />
        {children}
        <CtaBanner />
        <Footer />
      </body>
    </html>
  );
}
