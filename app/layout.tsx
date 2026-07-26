import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "廖沁｜品牌内容营销与社交传播",
  description:
    "廖沁的品牌内容营销、社交媒体营销与 Campaign 项目作品集。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "廖沁｜品牌内容营销与社交传播",
    description: "让品牌想说的话，变成用户愿意看的内容。",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "廖沁｜品牌内容营销与社交传播",
    description: "让品牌想说的话，变成用户愿意看的内容。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
