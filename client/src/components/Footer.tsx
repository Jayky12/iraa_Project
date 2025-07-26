import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ExternalLink, Facebook } from 'lucide-react';

// --- Import MUI Components ---
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.dark', color: 'white' }} component="footer">
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, py: { xs: 8, md: 12 } }}>
        <Grid container spacing={{ xs: 4, md: 8 }}>
          {/* Contact Information */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
              <Box sx={{ position: 'relative', height: 64, width: 64, flexShrink: 0, mr: 2 }}>
                <Image
                  src="https://ext.same-assets.com/1330206502/2847332074.png"
                  alt="KPRU Logo"
                  fill
                  style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                  sizes="(max-width: 600px) 64px, 64px"
                />
              </Box>
              <Box>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  วิเทศสัมพันธ์และกิจการอาเซียน
                </Typography>
                <Typography variant="body1" sx={{ color: 'primary.light' }}>
                  มหาวิทยาลัยราชภัฏกำแพงเพชร
                </Typography>
                <Typography variant="body2" sx={{ color: 'primary.light' }}>
                  International Relations & ASEAN Affairs
                </Typography>
              </Box>
            </Box>

            <List sx={{ '& .MuiListItemIcon-root': { minWidth: 'auto', mr: 1.5, mt: 0.5 }, '& .MuiListItemText-root': { m: 0 } }}>
              <ListItem disablePadding sx={{ alignItems: 'flex-start' }}>
                <ListItemIcon sx={{ color: 'primary.light' }}>
                  <MapPin size={20} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ color: 'primary.contrastText' }}>
                      69 หมู่ 1 ตำบลนครชุม อำเภอเมือง จังหวัดกำแพงเพชร 62000
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" sx={{ color: 'primary.light' }}>
                      69 M. 1 Nakorn Chum, Muang, Kamphaeng Phet 62000
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem disablePadding>
                <ListItemIcon sx={{ color: 'primary.light' }}>
                  <Phone size={20} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" sx={{ color: 'primary.contrastText' }}>
                    055-706-627
                  </Typography>
                </ListItemText>
              </ListItem>

              <ListItem disablePadding>
                <ListItemIcon sx={{ color: 'primary.light' }}>
                  <Mail size={20} />
                </ListItemIcon>
                <ListItemText>
                  <Link href="mailto:kpruinter2015@gmail.com" style={{ textDecoration: 'none' }}>
                    <Typography variant="body2" sx={{ color: 'primary.contrastText', '&:hover': { color: 'white' }, transition: 'color 0.2s' }}>
                      kpruinter2015@gmail.com
                    </Typography>
                  </Link>
                </ListItemText>
              </ListItem>

              <ListItem disablePadding sx={{ alignItems: 'flex-start' }}>
                <ListItemIcon sx={{ color: 'primary.light' }}>
                  <Clock size={20} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ color: 'primary.contrastText' }}>
                      จันทร์ - ศุกร์: 8:00 - 16:30 น.
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" sx={{ color: 'primary.light' }}>
                      Monday - Friday: 8:00 AM - 4:30 PM
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h6" component="h4" sx={{ fontWeight: 600, mb: 2 }}>
              ลิงก์ด่วน
            </Typography>
            <List disablePadding>
              {[
                { name: 'เกี่ยวกับเรา', href: '#' },
                { name: 'ข่าวประชาสัมพันธ์', href: '#' },
                { name: 'กิจกรรมนักศึกษา', href: '#' },
                { name: 'ความร่วมมือระหว่างประเทศ', href: '#' },
                { name: 'ดาวน์โหลด', href: '#' },
                { name: 'ติดต่อเรา', href: '#' },
              ].map((item, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <Link href={item.href} style={{ textDecoration: 'none' }}>
                    <Typography variant="body2" sx={{ color: 'primary.light', '&:hover': { color: 'white' }, transition: 'color 0.2s' }}>
                      {item.name}
                    </Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Related Links */}
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h6" component="h4" sx={{ fontWeight: 600, mb: 2 }}>
              ลิงก์ที่เกี่ยวข้อง
            </Typography>
            <List disablePadding>
              {[
                { name: 'มหาวิทยาลัยราชภัฏกำแพงเพชร', href: 'https://www.kpru.ac.th' },
                { name: 'กระทรวงการต่างประเทศ', href: 'http://www.mfa.go.th' },
                { name: 'กรมอาเซียน', href: 'http://www.mfa.go.th/asean/' },
                { name: 'Thai-AEC', href: 'http://www.thai-aec.com/' },
                { name: 'นโยบายข้อมูลส่วนบุคคล (PDPA)', href: 'https://arit.kpru.ac.th/contents/Disclaimer/Disclaimer.pdf' },
              ].map((item, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <Link href={item.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ color: 'primary.light', '&:hover': { color: 'white' }, transition: 'color 0.2s' }}>
                        {item.name}
                      </Typography>
                      <ExternalLink size={12} style={{ marginLeft: 4, color: 'inherit' }} />
                    </Box>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Divider sx={{ borderColor: 'primary.main', mt: 8, mb: 4 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Typography variant="body2" sx={{ color: 'primary.light', textAlign: { xs: 'center', sm: 'left' } }}>
              Actions, Creative, Together
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, height: 16, width: 1, bgcolor: 'primary.main' }} />
            <Typography variant="body2" sx={{ color: 'primary.light', textAlign: { xs: 'center', sm: 'left' } }}>
              &copy; 2025 มหาวิทยาลัยราชภัฏกำแพงเพชร
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              component={Link}
              href="https://www.facebook.com/iraa.kpru/"
              target="_blank"
              aria-label="Facebook"
              sx={{ color: 'primary.light', '&:hover': { color: 'white' }, transition: 'color 0.2s' }}
            >
              <Facebook size={20} />
            </IconButton>

            <Typography variant="body2" sx={{ color: 'primary.light' }}>
              เยี่ยมชมครั้งล่าสุด: มีนาคม 20, 2024 15:44:54
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: 'primary.light' }}>
            Powered by{' '}
            <Link href="https://kprucontrol.kpru.ac.th/" target="_blank" style={{ textDecoration: 'none' }}>
              <Typography component="span" variant="caption" sx={{ color: 'inherit', '&:hover': { color: 'white' }, transition: 'color 0.2s' }}>
                KPRUControl
              </Typography>
            </Link>{' '}
            Version 2.112 |{' '}
            <Link href="https://kprulib.kpru.ac.th/" target="_blank" style={{ textDecoration: 'none' }}>
              <Typography component="span" variant="caption" sx={{ color: 'inherit', '&:hover': { color: 'white' }, transition: 'color 0.2s' }}>
                KPRULib
              </Typography>
            </Link>{' '}
            |{' '}
            <Link href="https://arit.kpru.ac.th/" target="_blank" style={{ textDecoration: 'none' }}>
              <Typography component="span" variant="caption" sx={{ color: 'inherit', '&:hover': { color: 'white' }, transition: 'color 0.2s' }}>
                สำนักวิทยบริการและเทคโนโลยีสารสนเทศ
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}