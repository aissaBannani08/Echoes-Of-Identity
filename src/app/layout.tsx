import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Cinzel_Decorative, Playfair_Display } from "next/font/google";
import Script from "next/script";
import Chatbot from "@/components/Chatbot";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});
const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-cinzel",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://echoesofidentity.org"),
  title: "Echoes of Identity | Jewish & Muslim Oral History, Cultural Preservation & Storytelling",
  description: "Echoes of Identity preserves the lived stories of Jewish and Muslim communities worldwide through oral history, testimonies, digital archives, and youth-led cultural preservation. Join our international initiative.",
  keywords: "oral history, Jewish community, Muslim community, cultural preservation, storytelling, diaspora, immigration, identity, youth nonprofit, interfaith coexistence, Holocaust testimony, immigration narratives, identity and belonging",
  robots: "index, follow",
  authors: [{ name: "Echoes of Identity" }],
  openGraph: {
    title: "Echoes of Identity",
    description: "Preserving Jewish and Muslim stories through oral history & digital archives.",
    url: "https://echoesofidentity.org",
    siteName: "Echoes of Identity",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Echoes of Identity - Jewish & Muslim Oral History",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Echoes of Identity",
    description: "Preserving Jewish and Muslim stories before they disappear.",
    images: ["/og-image.jpg"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} ${cinzelDecorative.variable} ${playfair.variable} font-sans bg-midnight text-parchment antialiased selection:bg-gold selection:text-midnight`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9G0RJ68RY8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-9G0RJ68RY8');
          `}
        </Script>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
