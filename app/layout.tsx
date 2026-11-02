import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Helper from "@/components/Helper";
import { LangProvider } from "@/components/LangProvider";
import { getLang } from "@/lib/lang";
import { FONT_FAMILY, t } from "@/lib/i18n";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://arzinawees.in";

const OG_LOCALE: Record<string, string> = { hi: "hi_IN", en: "en_IN", mr: "mr_IN", bn: "bn_IN", te: "te_IN", ta: "ta_IN" };

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const title = `Arzinawees: ${t(lang, "brand.tag")}`;
  const description = t(lang, "foot.desc");
  return {
    metadataBase: new URL(SITE),
    title: { default: title, template: "%s | Arzinawees" },
    description,
    openGraph: { title, description, locale: OG_LOCALE[lang], type: "website" },
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  const fonts = Array.from(new Set(["Mukta:wght@400;600;700", FONT_FAMILY[lang]])).map((f) => `family=${f}`).join("&");
  return (
    <html lang={lang} data-lang={lang} suppressHydrationWarning>
      <head>
        <script
          // Page khulte hi saved theme lagao, taaki rang ek pal ke liye na badle
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Arzinawees",
              url: SITE,
              logo: `${SITE}/icon.svg`,
              email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "arzinawees@gmail.com",
              description: "Free written-complaint service against abuse and threats by loan recovery agents.",
              areaServed: "IN",
            }),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?${fonts}&family=Rozha+One&display=swap`}
        />
      </head>
      <body>
        <LangProvider lang={lang}>
          <Header />
          
          <main>{children}</main>
          <Footer />
          <Helper />
        </LangProvider>
      </body>
    </html>
  );
}
