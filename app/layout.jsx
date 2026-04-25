import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import { ROOT_METADATA } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { clinicSchema } from "@/lib/schema";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/footer/Footer";
import { CtaBanner } from "@/components/sections/cta-banner/CtaBanner";
import { HashCleanup } from "@/components/layout/HashCleanup";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata = ROOT_METADATA;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable, playfair.variable)}
    >
      <body className="bg-background text-foreground antialiased">
        <JsonLd data={clinicSchema()} />
        <HashCleanup />
        <Navbar />
        {children}
        {/* Site-wide booking CTA. The nav "Contact" link scrolls here via #contact. */}
        <CtaBanner />
        <Footer />
      </body>
    </html>
  );
}
