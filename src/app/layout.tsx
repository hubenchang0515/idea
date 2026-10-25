import type { Metadata, Viewport } from "next";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { OWNER_CONFIG, SITE_CONFIG } from "@/config";
import { absoluteUrl, OG_IMAGE, SITE_DESCRIPTION, SITE_TITLE } from "@/utils/seo";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_CONFIG.basePath}/`, SITE_CONFIG.origin),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_CONFIG.brand}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_CONFIG.brand,
  authors: [{ name: OWNER_CONFIG.name, url: OWNER_CONFIG.url }],
  creator: OWNER_CONFIG.name,
  publisher: OWNER_CONFIG.name,
  category: "technology",
  keywords: [
    SITE_CONFIG.brand,
    "编程",
    "开发笔记",
    "技术博客",
    "个人博客",
    OWNER_CONFIG.name,
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: absoluteUrl("/"),
    siteName: SITE_CONFIG.brand,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: absoluteUrl("/favicon.svg"),
    shortcut: absoluteUrl("/favicon.svg"),
  },
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eef7ff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1120' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteId = `${absoluteUrl("/")}#website`;
  const personId = `${absoluteUrl("/")}#person`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": siteId,
      url: absoluteUrl("/"),
      name: SITE_CONFIG.brand,
      alternateName: SITE_CONFIG.title,
      description: SITE_DESCRIPTION,
      inLanguage: "zh-CN",
      publisher: { "@id": personId },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": personId,
      name: OWNER_CONFIG.name,
      url: OWNER_CONFIG.url,
      image: OWNER_CONFIG.avatar,
      email: OWNER_CONFIG.email,
      description: OWNER_CONFIG.brief,
      sameAs: [`https://github.com/${OWNER_CONFIG.username}`],
    },
  ];

  return (
    <html lang="zh-CN">
      <body>
        <JsonLd data={jsonLd}/>
        {children}
      </body>
    </html>
  );
}
