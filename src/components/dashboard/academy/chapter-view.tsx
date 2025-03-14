'use client';

import * as React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

import type { Chapter } from './types';

const images: Record<'fat' | 'muscle' | 'sports', string> = {
  fat: '/assets/Fats.png',
  muscle: '/assets/Muscle.png',
  sports: '/assets/Sports.png',
};

const notes: Record<'fat' | 'muscle' | 'sports', string> = {
  fat: `Every 3-4 weeks have a 1 week diet break at your maintenance calories or 5-10% surplus of your NEW maintenance calories.`,
  muscle: `Every 3-4 months depending on BF% levels go on a MINI-CUT for 3-6 weeks at a 5-10% deficit to minimise execessive fat and improve insulin sensitivity which helps muscle building.`,
  sports: `Tailor your nutrition based on your performance goals In-Season, Off-Season & Pre-Season.`,
};

const tabs = [
  { label: 'FAT LOSS', value: 'fat' },
  { label: 'MUSCLE BUILDING', value: 'muscle' },
  { label: 'SPORTS NUTRITION', value: 'sports' },
];

export interface ChapterViewProps {
  chapter: Chapter;
}

export function ChapterView(): React.JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentTab, setCurrentTab] = React.useState(tabs[0].value);
  const currentIndex = tabs.findIndex((tab) => tab.value === currentTab);

  const handleChange = (_: any, newValue: React.SetStateAction<string>) => {
    setCurrentTab(newValue);
  };

  const handleNext = () => {
    if (currentIndex < tabs.length - 1) {
      setCurrentTab(tabs[currentIndex + 1].value);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentTab(tabs[currentIndex - 1].value);
    }
  };
  return (
    <Box sx={{ position: 'relative', pb: 6 }}>
      <Card>
        {/* <CardHeader title="PERIODISATION" /> */}
        {!isMobile && (
          <>
            <Tabs
              sx={{
                px: 3,
                mb: 1,
                '& .MuiTabs-indicator': { backgroundColor: '#D51331' },
                '& .MuiTab-root': { fontSize: !isMobile ? '1.2rem' : '0.8rem' },
              }}
              value={currentTab}
              onChange={handleChange}
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
            <Divider />
          </>
        )}

        <CardContent>
          {isMobile ? (
            // Mobile View: Display All Sections in a Column
            <Stack spacing={4}>
              {tabs.map((tab) => (
                <Box key={tab.value} textAlign="center">
                  <Box sx={{ textAlign: 'center', mt: 2, mb: 2, maxWidth: '80%', mx: 'auto' }}>
                    <Typography variant="body1" fontWeight="bold" color="#000000">
                      {tab.label}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <img
                      src={images[tab.value as keyof typeof images]}
                      alt={tab.label}
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </Box>
                  <Box sx={{ textAlign: 'justify', mt: 2, mb: 2 }}>
                    <Typography variant="body2" color="#000000">
                      {notes[tab.value as keyof typeof notes]}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          ) : (
            // Desktop View: Show only the current tab's content
            <Box textAlign="center">
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <img
                  src={images[currentTab as keyof typeof images]}
                  alt={currentTab}
                  style={{ maxWidth: '100%', height: '300px' }}
                />
              </Box>
              <Box sx={{ textAlign: 'center', mt: 5, mb: 1 }}>
                <Box sx={{ maxWidth: '80%', mx: 'auto' }}>
                  <Typography variant="body1" fontWeight="bold" color="#000000">
                    {notes[currentTab as keyof typeof notes]}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
      {!isMobile && (
        <Box
          sx={{
            bottom: 20,
            display: 'flex',
            justifyContent: 'center',
            left: 0,
            position: 'absolute',
            right: 0,
            zIndex: 1,
          }}
        >
          <Card sx={{ boxShadow: 'var(--mui-shadows-16)' }}>
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center', p: 1 }}>
              <Button
                color="secondary"
                size="small"
                startIcon={<ArrowLeftIcon />}
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                Prev
              </Button>
              <Typography color="text.secondary" variant="subtitle2">
                {currentIndex + 1}/{tabs.length}
              </Typography>
              <Button
                color="secondary"
                size="small"
                startIcon={<ArrowRightIcon />}
                onClick={handleNext}
                disabled={currentIndex === tabs.length - 1}
              >
                Next
              </Button>
            </Stack>
          </Card>
        </Box>
      )}
    </Box>
  );
}
