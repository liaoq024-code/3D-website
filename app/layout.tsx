import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title: "廖沁｜品牌内容营销与社交传播",
    description: "廖沁的品牌内容营销、社交媒体营销与 Campaign 项目作品集。",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "廖沁｜品牌内容营销与社交传播",
      description: "让品牌想说的话，变成用户愿意看的内容。",
      type: "website",
      images: [{ url: socialImage, width: 1792, height: 1024, alt: "廖沁｜3D品牌内容营销作品集" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "廖沁｜品牌内容营销与社交传播",
      description: "让品牌想说的话，变成用户愿意看的内容。",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
