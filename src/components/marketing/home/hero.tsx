'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { CourseCard } from '@/components/dashboard/academy/course-card';
import type { Course } from '@/components/dashboard/academy/types';

const courses = [
  {
    id: 'CRS-003',
    title: 'Activity-Based',
    description: 'Tailored calculations based on your daily activity level and workout frequency.',
    media: '/assets/activity-based.png',
    progress: 90,
  },
  {
    id: 'CRS-002',
    title: 'Smart Adjustments',
    description: 'Intelligent recommendations that adapt to your training history and goals.',
    media: '/assets/smart-adjustment.png',
    progress: 52,
  },
  {
    id: 'CRS-001',
    title: 'Progress Tracking',
    description: 'Monitor your progress with weight tracking and automatic macro adjustments.',
    media: '/assets/progress-tracking.png',
    progress: 23,
  },
] satisfies Course[];

export function Hero(): React.JSX.Element {
  return (
    <Box
      sx={{
        bgcolor: '#E3E3E3',
        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px), 
        linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
        backgroundSize: '70px 70px',
        color: '#000000',
        overflow: 'hidden',
        position: 'relative',
        paddingBottom: '30px',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 0,
        }}
      >
        <Box component="img" src="/assets/home-cosmic.svg" sx={{ height: 'auto', width: '1600px' }} />
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 1,
        }}
      >
        <Box component="img" src="/assets/home-rectangles.svg" sx={{ height: 'auto', width: '1900px' }} />
      </Box>
      <Container maxWidth="md" sx={{ position: 'relative', py: '50px', zIndex: 3 }}>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography sx={{ fontSize: '3.5rem', fontWeight: 600, lineHeight: 1.2, textAlign: 'center' }}>
              Your Personal Macro Calculator
            </Typography>
            <Typography sx={{ fontWeight: 400, textAlign: 'center' }} variant="h5">
              Get personalized macro recommendations based on your goals, activity level, and training history.
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
            <Button
              component={RouterLink}
              href={paths.dashboard.overview}
              variant="contained"
              endIcon={<span>→</span>}
              sx={{ borderRadius: '20px', fontSize: '1.1rem' }}
            >
              Calculate Your Macros
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, marginBottom: '50px' }}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
          <Grid container spacing={4}>
            {courses.map((course) => (
              <Grid
                key={course.id}
                size={{
                  md: 4,
                  xs: 12,
                }}
              >
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
      <Container
        sx={{
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          paddingTop: '20px',
          paddingBottom: '20px',
          borderRadius: '20px',
          width: '80%',
        }}
      >
        <Stack spacing={2} sx={{ justifyContent: 'center' }}>
          <Typography sx={{ fontSize: '2.0rem', fontWeight: 600, lineHeight: 1.2, textAlign: 'center' }}>
            Ready to Start Your Journey?
          </Typography>
          <Typography sx={{ fontSize: '1.2rem', color: '#333', marginTop: '10px', zIndex: 1, textAlign: 'center' }}>
            Get your personalized macro calculations in minutes.
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', marginTop: '30px' }}>
          <Button
            component={RouterLink}
            href={paths.dashboard.overview}
            variant="contained"
            sx={{ borderRadius: '20px', fontSize: '1.1rem' }}
          >
            Start Now
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
