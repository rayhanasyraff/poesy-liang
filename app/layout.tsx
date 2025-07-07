import type { Metadata } from "next";
import "./globals.css";

// export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "POESY LIANG",
  icons: {
    icon: "/assets/images/poesy-logo-black.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"> 
      <body className={`antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
