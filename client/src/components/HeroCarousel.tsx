'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface HeroSlide {
  id: number;
  title: string;
  image: string;
  link: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'MoU Signing Ceremony with International Partners',
    image: 'https://ext.same-assets.com/1330206502/2892877053.webp',
    link: '#',
  },
  {
    id: 2,
    title: 'Fulbright Senior Specialist Program 2022',
    image: 'https://ext.same-assets.com/1330206502/9536360.webp',
    link: '#',
  },
  {
    id: 3,
    title: 'Indonesia Ambassador Visit',
    image: 'https://ext.same-assets.com/1330206502/3705774742.webp',
    link: '#',
  },
  {
    id: 4,
    title: 'JOHO International Cooperation',
    image: 'https://ext.same-assets.com/1330206502/1977235119.webp',
    link: '#',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <Box
      component="section"
      sx={{
        background: 'linear-gradient(to bottom right, #e3f2fd, #bbdefb)', // from-blue-50 to-blue-100
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 2, // rounded-xl
            boxShadow: 3, // shadow-2xl, approximated
            bgcolor: 'background.paper',
          }}
        >
          {/* Main carousel */}
          <Box sx={{ position: 'relative', height: { xs: 384, md: 500 } }}>
            {heroSlides.map((slide, index) => (
              <Box
                key={slide.id}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  opacity: index === currentSlide ? 1 : 0,
                  transition: 'opacity 1000ms ease-in-out', // duration-1000
                }}
              >
                <Link href={slide.link} passHref style={{ display: 'block', position: 'relative', height: '100%' }}>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority={index === 0}
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 100vw" // Example sizes optimization
                  />
                  {/* Gradient overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent, transparent)', // from-black/60 via-transparent to-transparent
                    }}
                  />

                  {/* Content overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: { xs: 3, md: 4 },
                    }}
                  >
                    <Box sx={{ maxWidth: 600 }}>
                      <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                          fontSize: { xs: '1.25rem', md: '1.875rem' }, // text-xl md:text-3xl
                          fontWeight: 'bold',
                          color: 'white',
                          mb: 1,
                          textShadow: '0 2px 4px rgba(0,0,0,0.5)', // drop-shadow-lg
                        }}
                      >
                        {slide.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: '0.875rem', md: '1rem' }, // text-sm md:text-base
                          color: 'grey.200',
                          textShadow: '0 2px 4px rgba(0,0,0,0.5)', // drop-shadow-lg
                        }}
                      >
                        มหาวิทยาลัยราชภัฏกำแพงเพชร ก้าวสู่ความเป็นสากลด้วยความร่วมมือระหว่างประเทศ
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </Box>
            ))}

            {/* Navigation arrows */}
            <IconButton
              onClick={prevSlide}
              sx={{
                position: 'absolute',
                left: { xs: 16, md: 32 },
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.2)', // bg-white/20
                color: 'white',
                backdropFilter: 'blur(4px)', // backdrop-blur-sm
                height: { xs: 48, md: 48 },
                width: { xs: 48, md: 48 },
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.3)', // hover:bg-white/30
                },
              }}
              aria-label="ภาพก่อนหน้า"
            >
              <ChevronLeft size={24} />
            </IconButton>

            <IconButton
              onClick={nextSlide}
              sx={{
                position: 'absolute',
                right: { xs: 16, md: 32 },
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                backdropFilter: 'blur(4px)',
                height: { xs: 48, md: 48 },
                width: { xs: 48, md: 48 },
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.3)',
                },
              }}
              aria-label="ภาพถัดไป"
            >
              <ChevronRight size={24} />
            </IconButton>

            {/* Dots indicator */}
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: 16, md: 16 },
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: { xs: 1, md: 1 }, // space-x-2
              }}
            >
              {heroSlides.map((_, index) => (
                <Button
                  key={index}
                  onClick={() => goToSlide(index)}
                  sx={{
                    minWidth: 0,
                    width: 12,
                    height: 12,
                    p: 0,
                    borderRadius: '50%',
                    bgcolor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)', // bg-white bg-white/50
                    transition: 'all 300ms ease-in-out', // transition-all duration-300
                    transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)', // scale-110
                    '&:hover': {
                      bgcolor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.75)', // hover:bg-white/75
                    },
                  }}
                  aria-label={`ไปยังภาพที่ ${index + 1}`}
                />
              ))}
            </Box>
          </Box>

          {/* Bottom info bar */}
          <Box sx={{ bgcolor: 'primary.dark', color: 'white', p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { md: 'center' },
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: { xs: 1, md: 0 } }}>
                <Typography variant="body2" sx={{ fontWeight: 'semibold' }}>
                  Actions, Creative, Together
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'block' }, height: 16, width: 1, bgcolor: 'rgba(255,255,255,0.3)' }} />
                <Typography variant="body2">International Relations & ASEAN Affairs</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                69 M.1 Nakorn Chum, Muang, Kamphaeng Phet 62000
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}