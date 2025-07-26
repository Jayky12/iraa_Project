// src/theme/index.ts
import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // หรือสีหลักของ KPRU
    },
    secondary: {
      main: '#dc004e', // หรือสีรอง
    },
    // คุณสามารถเพิ่มสีอื่นๆ เช่น text, background ได้ที่นี่
  },
  typography: {
    fontFamily: 'Kanit, sans-serif', // ใช้ Kanit เป็น Font หลักของ MUI Components
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
    // ปรับแต่ง typography อื่นๆ ตามต้องการ
  },
  // เพิ่มการตั้งค่าอื่นๆ เช่น spacing, breakpoints, components override
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // ปิดการแปลงเป็นตัวพิมพ์ใหญ่
        },
      },
    },
  },
});

export default customTheme;