import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Cinzel_Decorative, Playfair_Display } from "next/font/google";
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
  title: "Echoes of Identity",
  description: "A Living Archive of Voices Across Time preserving Jewish and Muslim stories.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
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
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
