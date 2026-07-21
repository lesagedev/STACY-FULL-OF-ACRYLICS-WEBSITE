import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import { I18nProvider } from "@/lib/i18n/context";
import "./globals.css";

const fredoka = Fredoka({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-main",
});

export const metadata: Metadata = {
  title: "Stacy Full Of Acrylics | Prothésiste Ongulaire",
  description:
    "Portfolio de Stacy — prothésiste ongulaire spécialisée en gel, acryl et nail art.",
  openGraph: {
    title: "Stacy Full Of Acrylics",
    description: "Portfolio de Stacy — prothésiste ongulaire spécialisée en gel, acryl et nail art.",
    images: ["/gallery/IMG_9770.JPG- Compressed.webp"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`h-full antialiased ${fredoka.variable}`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
