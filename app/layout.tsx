import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduMyles - School Management SaaS",
  description: "Comprehensive multi-tenant school management platform for African educational institutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
