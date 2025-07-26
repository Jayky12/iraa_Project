import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // โปรดตรวจสอบว่า URL รูปภาพใช้ https หรือ http
        hostname: 'ext.same-assets.com',
        port: '',
        pathname: '**', // อนุญาตทุก Path ใต้ Domain นี้
      },
      // หากในอนาคตมี Domain อื่นๆ ที่ต้องการโหลดรูปภาพจากภายนอก ก็สามารถเพิ่มเข้ามาใน array นี้ได้เลย
      // {
      //   protocol: 'https',
      //   hostname: 'another-external-domain.com',
      //   port: '',
      //   pathname: '**',
      // },
    ],
  },
  /* config options here */ // ถ้ามี config อื่นๆ อยู่แล้ว ให้คงไว้
};

export default nextConfig;