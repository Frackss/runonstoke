import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stoke",
  description: "AI-powered recovery and performance dashboard for runners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
