// app/page.tsx
import Header from '@/components/Header'; // สมมติว่า Header จะถูกปรับให้ใช้ MUI หรือไม่ก็ได้
import HeroCarousel from '@/components/HeroCarousel'; // อาจจะใช้ Box หรือ Paper จาก MUI
import ContentTabs from '@/components/ContentTabs'; // ควรจะใช้ Tabs จาก MUI
import Sidebar from '@/components/Sidebar'; // อาจจะใช้ Box หรือ Paper จาก MUI
import Footer from '@/components/Footer'; // สมมติว่า Footer จะถูกปรับให้ใช้ MUI หรือไม่ก็ได้

// --- Import MUI Components ที่จำเป็น ---
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// ----------------------------------------

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <HeroCarousel />
        <Container maxWidth="lg" sx={{ py: 4 }}> 

          <Grid container spacing={4}>
            {/* Main Content */}
            <Grid item xs={12} lg={9}> 
              <ContentTabs />
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} lg={3}> 
              
              <Sidebar />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}