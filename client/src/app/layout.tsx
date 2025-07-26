// app/layout.tsx
import type { Metadata } from "next";
// --- แก้ไขการ import Geist Fonts ตรงนี้ ---
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
// ----------------------------------------
import { Kanit } from "next/font/google";

import "./globals.css";

// การใช้ Next.js Fonts เพื่อโหลด Font และใช้กับ Tailwind/Global CSS
const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  // display: 'swap', // แนะนำให้เพิ่ม display เพื่อ performance
});

// Geist Fonts ไม่ต้องกำหนด variable หรือ className แยกอีก เพราะมันทำมาให้แล้ว
// const geistSans = GeistSans; // ไม่ต้องประกาศซ้ำ
// const geistMono = GeistMono; // ไม่ต้องประกาศซ้ำ

export const metadata: Metadata = {
  title: "วิเทศสัมพันธ์และกิจการอาเซียน - มหาวิทยาลัยราชภัฏกำแพงเพชร",
  description: "สำนักงานวิเทศสัมพันธ์และกิจการอาเซียน มหาวิทยาลัยราชภัฏกำแพงเพชร - KPRU International Relations & ASEAN Affairs",
};

// --- นำเข้า MuiProviders ---
import MuiProviders from '@/components/MuiProviders';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ใช้ className ที่ Geist Font ให้มาโดยตรง
    <html lang="th" className={`${GeistSans.className} ${GeistMono.className} ${kanit.className}`}>
      <body suppressHydrationWarning className="antialiased">
        <MuiProviders>
          {children}
        </MuiProviders>
      </body>
    </html>
  );
}