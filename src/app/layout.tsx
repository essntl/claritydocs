import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claritydocs",
  description: "A beginner-first technical encyclopedia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
