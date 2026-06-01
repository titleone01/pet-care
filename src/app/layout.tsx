import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "泡泡爪宠物洗护 | 温柔专业的宠物洗护店",
  description:
    "泡泡爪宠物洗护提供猫犬洗澡护理、造型修剪、除味护理和幼宠适应服务。在线预约、透明价格、独立烘干箱与一宠一消毒。"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
