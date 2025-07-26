// src/components/MuiProviders.tsx
'use client'; // กำหนดให้เป็น Client Component

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import customTheme from '@/theme'; // หรือพาธที่คุณเก็บไฟล์ theme

export default function MuiProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={customTheme}>
      {/* CssBaseline resets browser default styles and applies MUI base styles */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}