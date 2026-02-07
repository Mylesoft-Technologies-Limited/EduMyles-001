import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EduMyles",
  description: "Multi-tenant school operations platform"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
