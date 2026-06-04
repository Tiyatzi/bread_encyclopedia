import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "面包百科 - 3D Bread Encyclopedia",
  description: "探索世界各地的面包文化与制作工艺，一个沉浸式 3D 地球可视化应用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="h-full">{children}</body>
    </html>
  );
}
