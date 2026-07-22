import type { Metadata } from "next";
import { Bebas_Neue, Outfit, Space_Grotesk, Sora, Fredoka } from "next/font/google";
import { I18nProvider } from "@/lib/i18n/context";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hero-family",
});

const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-family",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-accent-family",
});

const sora = Sora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-family",
});

const fredoka = Fredoka({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-main",
});

export const metadata: Metadata = {
  title: "STACYFULLOFACRYLICS | Prothésiste Ongulaire",
  description:
    "Portfolio de Stacy — prothésiste ongulaire spécialisée en gel, acryl et nail art.",
  openGraph: {
    title: "STACYFULLOFACRYLICS",
    description: "Portfolio de Stacy — prothésiste ongulaire spécialisée en gel, acryl et nail art.",
    images: ["/gallery/IMG_9770.JPG- Compressed.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`h-full antialiased ${bebas.variable} ${outfit.variable} ${spaceGrotesk.variable} ${sora.variable} ${fredoka.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
