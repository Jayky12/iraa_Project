'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- Import MUI Components ---
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia'; // ใช้สำหรับรูปภาพ
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// --- Import Icons from lucide-react ---
import { Calendar, Eye, Share2, ChevronRight } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  views: number;
  images: string[];
  category: string;
  link: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'มหาวิทยาลัยราชภัฏกำแพงเพชรเยือน CTU เพื่อสร้างความร่วมมือทางวิชาการกับประเทศเวียดนาม',
    excerpt: 'วันที่ 1-4 มิถุนายน 2568 ณ Can Tho University ประเทศเวียดนาม โดยมี Assoc. Prof. Tran Trung Tinh รองอธิการบดีฝ่ายวิชาการและวิเทศสัมพันธ์',
    date: '9 มิถุนายน 2568',
    views: 6,
    images: ['https://ext.same-assets.com/1330206502/95489024.webp', 'https://ext.same-assets.com/1330206502/1986755494.webp'],
    category: 'Public_Relations',
    link: '#',
  },
  {
    id: 2,
    title: 'มรภ.กพ. ลงนาม MoU กับ GEORGIA GWINNETT COLLEGE (GGC) ประเทศสหรัฐอเมริกา',
    excerpt: 'วันที่ 13 มิถุนายน 2568 มรภ.กพ. ลงนามบันทึกข้อตกลง (MoU) ทางวิชาการ 2 มหาวิทยาลัย GEORGIA GWINNETT COLLEGE (GGC) ประเทศสหรัฐอเมริกา',
    date: '21 มิถุนายน 2568',
    views: 160,
    images: ['https://ext.same-assets.com/1330206502/912013494.webp', 'https://ext.same-assets.com/1330206502/3763645782.webp'],
    category: 'Public_Relations',
    link: '#',
  },
  {
    id: 3,
    title: 'กิจกรรมวันสงกรานต์สำหรับนักศึกษาต่างชาติ ประจำปี 2568',
    excerpt: 'วันที่ 11 เมษายน 2568 เวลา 15.00 น. ณ อาคารบริหาร มหาวิทยาลัยราชภัฏกำแพงเพชร "วันสงกรานต์ไทย" สำหรับนักศึกษาต่างชาติ 10 คน',
    date: '12 เมษายน 2568',
    views: 624,
    images: ['https://ext.same-assets.com/1330206502/1511101559.webp', 'https://ext.same-assets.com/1330206502/1027198874.webp'],
    category: 'Students_Activities',
    link: '#',
  },
  {
    id: 4,
    title: 'เยาวชน ASEAN Young Leaders ศึกษาเรียนรู้ ณ กรมอาเซียน กระทรวงการต่างประเทศ',
    excerpt: 'วันที่ 19 มิถุนายน 2568 คณะผู้แทนมหาวิทยาลัยราชภัฏกำแพงเพชร ASEAN Young Leaders 2568 ศึกษาเรียนรู้ ณ กรมอาเซียน กระทรวงการต่างประเทศ',
    date: '22 มิถุนายน 2568',
    views: 452,
    images: ['https://ext.same-assets.com/1330206502/3740569922.webp', 'https://ext.same-assets.com/1330206502/3561668640.webp'],
    category: '55',
    link: '#',
  },
  {
    id: 5,
    title: 'บุคลากรงานวิเทศสัมพันธ์เข้าร่วมประชุมเชิงปฏิบัติการทบวทวนแผนกลยุทธ์ ประจำปี 2568',
    excerpt: 'วันที่ 24-25 มิถุนายน 2568 รศ.ดร.สุรพงษ์ ช่วยบำรุง อธิการบดีมหาวิทยาลัยราชภัฏกำแพงเพชร แผนกลยุทธ์ 2566-2570 ประจำปี 2569',
    date: '25 มิถุนายน 2568',
    views: 479,
    images: ['https://ext.same-assets.com/1330206502/43557309.webp', 'https://ext.same-assets.com/1330206502/10000006.webp'],
    category: 'Staff_Activities_Thai',
    link: '#',
  },
];

const categories = [
  { id: 'Public_Relations', name: 'ประชาสัมพันธ์', icon: '' },
  { id: '55', name: 'ประกันคุณภาพ', icon: '' },
  { id: 'Students_Activities', name: 'กิจกรรมนักศึกษา', icon: '' },
  { id: 'Interstudents_Activities', name: 'กิจกรรมนักศึกษาต่างชาติ', icon: '' },
  { id: 'Staff_Activities_Thai', name: 'กิจกรรมบุคลากร', icon: '' },
];

// Styled component สำหรับ line-clamp
const LineClampTypography = styled(Typography)<{ lines: number }>(({ lines }) => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}));

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Card
      sx={{
        borderRadius: 2, // 
        boxShadow: 2, // 
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)', // ยกขึ้นเล็กน้อยเมื่อ hover
        },
      }}
    >
      <Box sx={{ position: 'relative', height: 192, overflow: 'hidden', borderRadius: '8px 8px 0 0' }}>
        <Grid container spacing={0.5} sx={{ height: '100%' }}>
          {item.images.slice(0, 2).map((image, index) => (
            <Grid item xs={6} key={index} sx={{ position: 'relative' }}>
              <Image
                src={image}
                alt={`${item.title} - รูปที่ ${index + 1}`}
                fill
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease-in-out', // group-hover:scale-110 transition-transform duration-500
                }}
                sizes="(max-width: 600px) 50vw, (max-width: 960px) 25vw, 15vw"
                // เพิ่ม className หรือ sx ให้กับการ hover effect ถ้า Image รองรับ (แต่ต้องใช้ CSS ภายนอกหรือ Emotion custom)
                // เนื่องจาก next/image ไม่ได้ส่งผ่าน ref ไปให้ component ภายในโดยตรง
                // วิธีการคือต้องใช้ Box หรือ div ห่ออีกชั้นแล้วให้ hover effect ที่ Box/div นั้น
                // หรือใช้ Styled component กับ Image โดยตรง (ถ้าเป็นไปได้)
              />
            </Grid>
          ))}
        </Grid>
        {item.images.length > 2 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              bgcolor: 'rgba(0, 0, 0, 0.7)', // bg-black/70
              color: 'white',
              fontSize: '0.75rem', // text-xs
              px: 1, // px-2
              py: 0.5, // py-1
              borderRadius: 1, // rounded
            }}
          >
            +{item.images.length - 2} รูป
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: 2 }}>
        <Link href={item.link} style={{ textDecoration: 'none' }}>
          <LineClampTypography
            variant="h6"
            component="h3"
            lines={2}
            sx={{
              fontWeight: 'medium', // font-semibold
              color: 'text.primary', // text-gray-900
              mb: 1, // mb-2
              lineHeight: '1.4', // leading-snug
              '&:hover': {
                color: 'primary.main', // hover:text-blue-600 (ตาม theme)
              },
            }}
          >
            {item.title}
          </LineClampTypography>
        </Link>

        <LineClampTypography
          variant="body2"
          color="text.secondary"
          lines={3}
          sx={{ mb: 1.5 }} // mb-3
        >
          {item.excerpt}
        </LineClampTypography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'text.disabled', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Calendar size={12} /> {/* h-3 w-3 */}
              <Typography variant="caption">{item.date}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Eye size={12} /> {/* h-3 w-3 */}
              <Typography variant="caption">{item.views}</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
          <Button
            startIcon={<Share2 size={16} />} // h-4 w-4
            sx={{
              color: 'primary.main', // text-blue-600
              textTransform: 'none',
              minWidth: 0,
              p: 0,
              '&:hover': {
                bgcolor: 'primary.light', // hover:bg-blue-50
                color: 'primary.dark', // hover:text-blue-700
              },
            }}
          >
            Share
          </Button>

          <Button
            component={Link}
            href={item.link}
            endIcon={<ChevronRight size={16} />} // h-4 w-4
            sx={{
              color: 'text.secondary', // text-gray-600
              textTransform: 'none',
              minWidth: 0,
              p: 0,
              '&:hover': {
                color: 'primary.main', // hover:text-blue-600
              },
            }}
          >
            อ่านต่อ
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function ContentTabs() {
  const [activeTab, setActiveTab] = useState<string | number>('Public_Relations');

  const handleChange = (event: React.SyntheticEvent, newValue: string | number) => {
    setActiveTab(newValue);
  };

  const filteredNews = newsData.filter((item) => item.category === activeTab);

  // Helper for TabPanel
  interface TabPanelProps {
    children?: React.ReactNode;
    index: string | number;
    value: string | number;
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ pt: 4 }}>{children}</Box> // mt-8
        )}
      </div>
    );
  }

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}> {/* py-12 bg-gray-50 */}
      <Container maxWidth="lg">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="news categories tabs"
          variant="scrollable" // ถ้ามี category เยอะ ให้ scroll ได้
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            minHeight: 'auto', // เพื่อให้ไม่สูงเกินไป
            '.MuiTabs-flexContainer': {
              flexWrap: 'wrap', // ให้ wrap ลงมาถ้าพื้นที่ไม่พอ
              gap: 1, // gap ระหว่าง tab
              justifyContent: 'space-between',
            },
            bgcolor: 'white',
            borderRadius: 2, // rounded-lg
            boxShadow: 1, // shadow-sm
            border: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              flexDirection: 'column', // flex-col
              justifyContent: 'center',
              alignItems: 'center',
              px: 2,
              py: 1.5,
              minHeight: 0,
              fontSize: '0.75rem', // text-xs
              '@media (min-width:600px)': { // md breakpoint
                flexDirection: 'row', // md:flex-row
                fontSize: '0.875rem', // md:text-sm
                gap: 1, // md:space-x-2
              },
              '&.Mui-selected': {
                bgcolor: 'primary.main', // data-[state=active]:bg-blue-600
                color: 'white', // data-[state=active]:text-white
                boxShadow: 2, // data-[state=active]:shadow-md
                borderRadius: 1,
              },
            },
            '& .MuiTabs-indicator': {
              display: 'none', // ซ่อน indicator เพราะเราใช้ background-color ที่ Tab โดยตรง
            },
          }}
        >
          {categories.map((category) => (
            <Tab
              key={category.id}
              label={
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
                  <Typography variant="body1" component="span" sx={{ fontSize: { xs: '1.25rem', md: '1rem' } }}>
                    {category.icon}
                  </Typography>
                  <Typography variant="body2" component="span" sx={{ textAlign: 'center' }}>
                    {category.name}
                  </Typography>
                </Box>
              }
              value={category.id}
            />
          ))}
        </Tabs>

        {categories.map((category) => (
          <CustomTabPanel key={category.id} value={activeTab} index={category.id}>
            <Grid container spacing={3}> {/* gap-6 */}
              {filteredNews.length > 0 ? (
                filteredNews.map((item) => (
                  <Grid item xs={12} md={6} lg={4} key={item.id}>
                    <NewsCard item={item} />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <Typography variant="h6" color="text.disabled" mb={1}>
                      ไม่มีข้อมูลในหมวดหมู่นี้
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      กรุณาเลือกหมวดหมู่อื่น
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>

            {filteredNews.length > 0 && (
              <Box sx={{ textAlign: 'center', mt: 4 }}> {/* mt-8 */}
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'primary.main', // border-blue-600
                    color: 'primary.main', // text-blue-600
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: 'primary.main', // hover:bg-blue-600
                      color: 'white', // hover:text-white
                      borderColor: 'primary.main',
                    },
                  }}
                  endIcon={<ChevronRight size={16} />}
                >
                  ดูข่าวทั้งหมดในหมวด{category.name}
                </Button>
              </Box>
            )}
          </CustomTabPanel>
        ))}
      </Container>
    </Box>
  );
}