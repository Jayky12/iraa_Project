'use client'; // กำหนดให้เป็น Client Component

import React, { ReactElement, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// --- Import MUI Components ---
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu'; // MUI Menu
import MenuItem from '@mui/material/MenuItem'; // MUI MenuItem
import Divider from '@mui/material/Divider'; // ใช้สำหรับเส้นแบ่งในเมนู
import Drawer from '@mui/material/Drawer'; // สำหรับ Mobile Navigation
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse'; // สำหรับ expand/collapse ใน mobile
import ListItemIcon from '@mui/material/ListItemIcon'; // สำหรับใส่ icon ใน list item

// --- Import Icons from lucide-react ---
import { Menu as MenuIcon, X as CloseIcon, ChevronDown, Globe } from 'lucide-react';

interface NavItem {
  title: string;
  href?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { title: 'หน้าหลัก', href: '/' },
  {
    title: 'สื่อสิ่งพิมพ์',
    children: [
      { title: 'รายงานสรุปโครงการพัฒนานักศึกษาสู่สากล 2019', href: '#' },
      { title: 'แผนกลยุทธ์มหาวิทยาลัยราชภัฏกำแพงเพชร 2561-2565', href: '#' },
      { title: 'รายงานประจำปี', href: '#' },
      { title: 'เกี่ยวกับ มรภ. กพ.', href: '#' },
      { title: 'แนะนำการสมัครเรียน', href: '#' },
    ],
  },
  {
    title: 'IRAA แลกเปลี่ยนความรู้',
    children: [
      { title: 'ความเป็นสากลในบ้าน', href: '#' },
      { title: 'โมเดลการเรียนรู้ในโลกหลังโควิด', href: '#' },
      { title: 'คำศัพท์ชื่อตำแหน่งไทย-อังกฤษ', href: '#' },
      { title: 'คำศัพท์ด้านการศึกษา', href: '#' },
      { title: 'บอกเล่าประสบการณ์แลกเปลี่ยนในต่างประเทศ', href: '#' },
    ],
  },
  {
    title: 'ประกันคุณภาพ',
    children: [
      { title: 'แผนด้านการอุดมศึกษาเพื่อผลิตและพัฒนากำลังคนของประเทศ พ.ศ. 2564 - 2570', href: '#' },
      { title: 'แผนกลยุทธ์มหาวิทยาลัยราชภัฏกำแพงเพชร 2561-2565', href: '#' },
      { title: 'แผนยุทธศาสตร์งานวิเทศสัมพันธ์และกิจการอาเซียน พ.ศ. 2565-2568', href: '#' },
    ],
  },
  {
    title: 'เกี่ยวกับเรา',
    children: [
      { title: 'บุคลากร', href: '#' },
      { title: 'ความเป็นมา', href: '#' },
      { title: 'วิสัยทัศน์', href: '#' },
      { title: 'พันธกิจ', href: '#' },
      { title: 'โครงสร้างงาน', href: '#' },
    ],
  },
  {
    title: 'ข้อมูลความร่วมมือ',
    children: [
      { title: 'ความร่วมมือด้านต่างประเทศของมหาวิทยาลัยราชภัฏกำแพงเพชร', href: '#' },
      { title: 'รายงานสรุปความร่วมมือกับวิทยาลัยการท่องเที่ยวยูนนาน', href: '#' },
    ],
  },
  { title: 'ดาวน์โหลด', href: '#' },
  { title: 'ข่าวสาร', href: '#' },
  { title: 'ติดต่อเรา', href: '#' },
];

export default function Header() {
  // State สำหรับ Mobile Drawer (Sheet)
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // State สำหรับ Desktop Dropdown Menus
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, title: string) => {
    setAnchorEl(event.currentTarget);
    setOpenSubMenu(title);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenSubMenu(null);
  };

  // Component สำหรับรายการเมนูใน Mobile Drawer
  const MobileDrawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        IRAA KPRU
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.children ? (
              <>
                <ListItemButton
                  onClick={() => setOpenSubMenu(openSubMenu === item.title ? null : item.title)}
                  sx={{ px: 3 }}
                >
                  <ListItemText primary={item.title} />
                  <ChevronDown
                    size={20}
                    style={{ transform: openSubMenu === item.title ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                  />
                </ListItemButton>
                <Collapse in={openSubMenu === item.title} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child, childIndex) => (
                      <ListItemButton key={childIndex} component={Link} href={child.href || '#'} sx={{ pl: 4 }}>
                        <ListItemText primary={child.title} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItemButton component={Link} href={item.href || '#'} sx={{ px: 3 }}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    // AppBar สำหรับ Header หลัก
    <AppBar position="sticky" sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'divider', boxShadow: 'none' }}>
      <Container maxWidth="lg">
        {/* Top bar with contact info */}
        <Toolbar sx={{ minHeight: 'auto', py: 1, borderBottom: 1, borderColor: 'divider', display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              International Relations & ASEAN Affairs
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', md: 'block' } }}>
              |
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', md: 'block' } }}>
              Tel. 055-706-627
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button color="inherit" size="small" startIcon={<Globe size={18} />}>
              ไทย
            </Button>
            <Button color="inherit" size="small">
              Eng
            </Button>
          </Box>
        </Toolbar>

        {/* Main navigation */}
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <Box sx={{ position: 'relative', width: 64, height: 64 }}>
              <Image
                src="https://ext.same-assets.com/1330206502/2847332074.png"
                alt="KPRU Logo"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography variant="h6" component="h1" sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
                วิเทศสัมพันธ์และกิจการอาเซียน
              </Typography>
              <Typography variant="body2" color="text.secondary">
                มหาวิทยาลัยราชภัฏกำแพงเพชร
              </Typography>
            </Box>
          </Link>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.children ? (
                    <>
                      <Button
                        aria-controls={openSubMenu === item.title ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openSubMenu === item.title ? 'true' : undefined}
                        onClick={(event) => handleMenuClick(event, item.title)}
                        endIcon={<ChevronDown size={18} />}
                        sx={{ textTransform: 'none', fontWeight: 500 }}
                      >
                        {item.title}
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={openSubMenu === item.title}
                        onClose={handleMenuClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        {item.children.map((child, childIndex) => (
                          <MenuItem
                            key={childIndex}
                            onClick={handleMenuClose}
                            component={Link}
                            href={child.href || '#'}
                          >
                            {child.title}
                          </MenuItem>
                        ))}
                      </Menu>
                    </>
                  ) : (
                    <Button
                      component={Link}
                      href={item.href || '#'}
                      sx={{ textTransform: 'none', fontWeight: 500 }}
                    >
                      {item.title}
                    </Button>
                  )}
                </div>
              ))}
            </Box>
          </Box>

          {/* Mobile Navigation Toggle */}
          <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ ml: 1, color: 'text.primary' }}
            >
              <MenuIcon size={24} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {MobileDrawerContent}
      </Drawer>
    </AppBar>
  );
}