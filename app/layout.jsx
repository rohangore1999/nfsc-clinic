import "./globals.css";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import { ROOT_METADATA } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { clinicSchema } from "@/lib/schema";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/footer/Footer";
import { HashCleanup } from "@/components/layout/HashCleanup";

const GA_ID = "G-Y2FN7G27SJ";
const CLARITY_ID = "xsfpfqo8kr";

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
      lang="en-IN"
      className={cn("font-sans", inter.variable, playfair.variable)}
    >
      <body className="bg-background text-foreground antialiased">
        {/* Google Analytics 4 — lazyOnload keeps the ~160KB gtag bundle off the
            critical path (it was the biggest source of unused JS + long tasks). */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        {/* Microsoft Clarity — heatmaps & session recordings (deferred to idle) */}
        <Script id="clarity-init" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-9999 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <JsonLd data={clinicSchema()} />
        <HashCleanup />
        <Navbar />
        {children}
        <CtaBanner />
        <Footer />
      </body>
    </html>
  );
}
