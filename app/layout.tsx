import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Physics Stars",
  description:
    "A Physics Stars reinventem la manera d’aprendre física amb una plataforma edtech que integra de forma immersiva pensament crític i gamificació",
  keywords:
    "",
  applicationName: "Physics Stars",
  authors: [{ name: "David Diestre" }, { name: "Juan Roset" }, { name: "Marcel Povill" }, { name: "Aissam Khadraoui" }],
  openGraph: {
    title: "Physics Stars",
    description: "A Physics Stars reinventem la manera d’aprendre física amb una plataforma edtech que integra de forma immersiva pensament crític i gamificació",
    url: "https://physicsstars.com",
    siteName: "Physics Stars",
    locale: "ca_ES",
    type: "website",
    images: [
      // {
      //   url: "https://physicsstars.com/preview_og.png",
      //   width: 1200,
      //   height: 630,
      //   alt: "Physics Stars,
      // },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Physics Stars",
    description:
      "A Physics Stars reinventem la manera d’aprendre física amb una plataforma edtech que integra de forma immersiva pensament crític i gamificació",
    images: ["https://physicsstars.com/preview_twitter.png"],
  },
  icons: [
    { rel: "icon", type: "image/ico", sizes: "64x64", url: "/favicon.ico" },
    // { rel: "icon", type: "image/ico", sizes: "32x32", url: "/favicon-32x32.ico" },
    // { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
    // {
    //   rel: "apple-touch-icon",
    //   sizes: "144x144",
    //   type: "image/png",
    //   url: "/apple-touch-icon.png",
    // },
  ],
  metadataBase: new URL("https://physicsstars.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    theme = prefersDark ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}