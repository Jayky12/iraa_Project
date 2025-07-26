'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- Import MUI Components ---
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

// --- Import Icons from lucide-react ---
import { ExternalLink, Users, Eye, Calendar, FileText, PlayCircle } from 'lucide-react';

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color: string; // This will be handled by MUI sx prop
}

interface NewsletterItem {
  title: string;
  issue: string;
  image: string;
  link: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    icon: 'https://ext.same-assets.com/1330206502/829960231.png',
    url: 'https://www.facebook.com/iraa.kpru/',
    color: '#1877F2', // Facebook blue
  },
  {
    name: 'Twitter',
    icon: 'https://ext.same-assets.com/1330206502/1839206594.png',
    url: '#',
    color: '#1DA1F2', // Twitter blue
  },
  {
    name: 'Google Plus', // Note: Google+ no longer exists, consider updating this
    icon: 'https://ext.same-assets.com/1330206502/846978439.png',
    url: '#',
    color: '#DB4437', // Google red
  },
  {
    name: 'LINE',
    icon: 'https://ext.same-assets.com/1330206502/2036420295.png',
    url: '#',
    color: '#00B900', // LINE green
  },
  {
    name: 'LinkedIn',
    icon: 'https://ext.same-assets.com/1330206502/2636802577.png',
    url: '#',
    color: '#0A66C2', // LinkedIn blue
  },
];

const externalLinks = [
  {
    title: 'Thai-AEC',
    image: 'https://ext.same-assets.com/1330206502/1587328289.webp',
    url: 'http://www.thai-aec.com/',
  },
  {
    title: 'ASEAN Law Association',
    image: 'https://ext.same-assets.com/1330206502/3456670506.webp',
    url: 'http://www.aseanlawassociation.org/',
  },
  {
    title: 'กระทรวงการต่างประเทศ',
    image: 'https://ext.same-assets.com/1330206502/3156908552.webp',
    url: 'http://www.mfa.go.th/',
  },
  {
    title: 'กรมอาเซียน กระทรวงการต่างประเทศ',
    image: 'https://ext.same-assets.com/1330206502/2221972923.webp',
    url: 'http://www.mfa.go.th/asean/',
  },
];

const newsletters: NewsletterItem[] = [
  {
    title: 'IRAA Newsletter Issue 1',
    issue: '2023-1',
    image: 'https://ext.same-assets.com/1330206502/2974906940.webp',
    link: '#',
  },
  {
    title: 'IRAA Newsletter Issue 2',
    issue: '2023-2',
    image: 'https://ext.same-assets.com/1330206502/3977006269.webp',
    link: '#',
  },
  {
    title: 'IRAA Newsletter Issue 3',
    issue: '2023-3',
    image: 'https://ext.same-assets.com/1330206502/3671399325.webp',
    link: '#',
  },
];

const videoGallery = [
  {
    title: 'KPRU Presentation 2023',
    date: '7 พฤศจิกายน 2565',
    views: 2689,
    thumbnail: 'https://ext.same-assets.com/1330206502/2949981749.webp',
    link: '#',
  },
  {
    title: 'Fulbright Senior Specialist',
    date: '17 มิถุนายน 2565',
    views: 2282,
    thumbnail: 'https://ext.same-assets.com/1330206502/2107900828.webp',
    link: '#',
  },
  {
    title: 'Welcome to KPRU',
    date: '29 ตุลาคม 2564',
    views: 2452,
    thumbnail: 'https://ext.same-assets.com/1330206502/2166030470.webp',
    link: '#',
  },
];

// Styled component สำหรับ line-clamp (ถ้ายังไม่ได้สร้างในไฟล์อื่น)
const LineClampTypography = styled(Typography)<{ lines: number }>(({ lines }) => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}));

export default function Sidebar() {
  const [visitorCount, setVisitorCount] = useState(3318300);

  // Simulate visitor count update
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Social Media Links */}
      <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
        <CardHeader
          title={
            <Typography variant="h6" component="h2" sx={{ fontSize: '1.125rem', fontWeight: 600, color: 'text.primary' }}>
              ติดตามเรา
            </Typography>
          }
          sx={{ pb: 1 }}
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                component={Link}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                sx={{
                  p: 1,
                  borderRadius: 1,
                  bgcolor: 'grey.100', // bg-gray-100
                  transition: 'background-color 0.2s, transform 0.2s', // transition-all duration-200
                  '&:hover': {
                    bgcolor: social.color, // hover:bg-{color}
                    transform: 'scale(1.05)', // hover:scale-105
                    '& .MuiBox-root img': {
                      filter: 'brightness(0) invert(1)', // group-hover:brightness-0 group-hover:invert
                    },
                  },
                }}
              >
                <Box sx={{ position: 'relative', width: 24, height: 24 }}>
                  <Image src={social.icon} alt={social.name} fill />
                </Box>
              </IconButton>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Visitor Counter */}
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: 1,
          background: 'linear-gradient(to bottom right, #e3f2fd, #bbdefb)', // from-blue-50 to-blue-100
          borderColor: 'primary.light', // border-blue-200
          borderWidth: 1,
          borderStyle: 'solid',
        }}
      >
        <CardContent sx={{ textAlign: 'center', p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Image
              src="https://ext.same-assets.com/1330206502/2994906274.png"
              alt="QR Code"
              width={80}
              height={80}
              style={{ margin: '0 auto' }}
            />
          </Box>
          <Typography variant="h3" component="div" sx={{ fontSize: '2rem', fontWeight: 700, color: 'primary.dark', mb: 1 }}>
            {visitorCount.toLocaleString()}
          </Typography>
          <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>
            Visitors
          </Typography>
        </CardContent>
      </Card>

      {/* Newsletter */}
      <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FileText size={20} style={{ marginRight: 8 }} />
              <Typography variant="h6" component="h2" sx={{ fontSize: '1.125rem', fontWeight: 600, color: 'text.primary' }}>
                จดหมายข่าว
              </Typography>
            </Box>
          }
          sx={{ pb: 1 }}
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {newsletters.map((newsletter, index) => (
              <Button
                key={index}
                component={Link}
                href={newsletter.link}
                sx={{
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  p: 1,
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'grey.50',
                  },
                }}
              >
                <Box sx={{ position: 'relative', width: 48, height: 64, flexShrink: 0, mr: 1.5 }}>
                  <Image
                    src={newsletter.image}
                    alt={newsletter.title}
                    fill
                    style={{ objectFit: 'cover', borderRadius: 4, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: 'text.primary',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {newsletter.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {newsletter.issue}
                  </Typography>
                </Box>
              </Button>
            ))}
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" fullWidth endIcon={<ExternalLink size={16} />} sx={{ textTransform: 'none' }}>
              ดูทั้งหมด
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* External Links */}
      <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
        <CardHeader
          title={
            <Typography variant="h6" component="h2" sx={{ fontSize: '1.125rem', fontWeight: 600, color: 'text.primary' }}>
              ลิงก์ที่เกี่ยวข้อง
            </Typography>
          }
          sx={{ pb: 1 }}
        />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={1.5}>
            {externalLinks.map((link, index) => (
              <Grid item xs={6} key={index}>
                <Button
                  component={Link}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.title}
                  sx={{
                    display: 'block',
                    width: '100%',
                    p: 0,
                    textTransform: 'none',
                    '&:hover .MuiBox-root': {
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    },
                    '&:hover img': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', height: 80, bgcolor: 'grey.100', borderRadius: 2, overflow: 'hidden' }}>
                    <Image
                      src={link.image}
                      alt={link.title}
                      fill
                      style={{ objectFit: 'contain', padding: 8 }}
                    />
                  </Box>
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Video Gallery */}
      <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PlayCircle size={20} style={{ marginRight: 8 }} />
              <Typography variant="h6" component="h2" sx={{ fontSize: '1.125rem', fontWeight: 600, color: 'text.primary' }}>
                วิดีโอแกลเลอรี่
              </Typography>
            </Box>
          }
          sx={{ pb: 1 }}
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {videoGallery.map((video, index) => (
              <Button
                key={index}
                component={Link}
                href={video.link}
                sx={{
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  p: 1,
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'grey.50',
                  },
                }}
              >
                <Box sx={{ position: 'relative', width: 64, height: 48, flexShrink: 0, bgcolor: 'grey.200', borderRadius: 1, overflow: 'hidden', mr: 1.5 }}>
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PlayCircle size={24} style={{ color: 'white', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))' }} />
                  </Box>
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <LineClampTypography
                    variant="body2"
                    lines={2}
                    sx={{
                      fontWeight: 500,
                      color: 'text.primary',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {video.title}
                  </LineClampTypography>
                  <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', color: 'text.secondary', mt: 0.5, gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Calendar size={12} />
                      <Typography variant="caption">{video.date}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Eye size={12} />
                      <Typography variant="caption">{video.views.toLocaleString()}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Button>
            ))}
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" fullWidth endIcon={<ExternalLink size={16} />} sx={{ textTransform: 'none' }}>
              ดูวิดีโอทั้งหมด
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}