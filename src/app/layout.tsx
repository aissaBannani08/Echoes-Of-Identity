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
  metadataBase: new URL("https://echoes-of-identity.vercel.app"),
  title: "Echoes of Identity",
  description: "A Living Archive of Voices Across Time preserving Jewish and Muslim stories.",
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
