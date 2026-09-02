import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { PreferencesProvider } from "@/components/providers/Preferences";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { getCurrentUser } from "@/lib/auth/dal";
import { site } from "@/lib/site";

/** Display — geometric, slightly aeronautical. Headings only. */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

/** UI / body. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Signature mono — plan data, country codes, coordinates, prices. */
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Travel eSIMs for ${site.countriesCovered} countries`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["eSIM", "travel eSIM", "international data", "roaming", "QR eSIM"],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Land connected`,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

/** Dark is the first-class theme, so the browser chrome matches the night
 *  canvas before the theme script runs. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7fc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e1a" },
  ],
};

/* Set the theme class before paint to avoid a flash of the wrong theme.
   Aurora Signal (dark) is the default: light applies only when the visitor
   has explicitly chosen it. */
const themeScript = `(()=>{try{const t=localStorage.getItem('velusim:theme');const d=t?t!=='light':true;const e=document.documentElement;e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light';}catch(_){document.documentElement.classList.add('dark');}})();`;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();
  const account = user
    ? { firstName: user.firstName, balanceCents: user.balanceCents }
    : null;
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-night text-ink">
        <PreferencesProvider>
          <a
            href="#main"
            className="sr-only rounded-full bg-aurora px-4 py-2 font-medium text-on-aurora focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
          >
            Skip to content
          </a>
          <Header account={account} />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </PreferencesProvider>
      </body>
    </html>
  );
}
