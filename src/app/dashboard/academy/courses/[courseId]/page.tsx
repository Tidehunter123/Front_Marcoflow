'use client';

import * as React from 'react';
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import { ChapterView } from '@/components/dashboard/academy/chapter-view';

export default function Page(): React.JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
        mt: !isMobile ? -2 : 0,
      }}
    >
      <Stack spacing={4}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant={!isMobile ? 'h4' : 'h5'}>Periodization</Typography>
          </Box>
        </Stack>
        <Grid container spacing={4}>
          <Grid
            size={{
              md: 12,
              xs: 12,
            }}
          >
            <ChapterView />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
