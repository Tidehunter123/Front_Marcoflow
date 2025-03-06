import * as React from 'react';
import RouterLink from 'next/link';
import { Container, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { paths } from '@/paths';

import { Logo } from '../core/logo';

export interface SplitLayoutProps {
  children: React.ReactNode;
}

export function SplitLayout({ children }: SplitLayoutProps): React.JSX.Element {
  return (
    <Box>
      <div>
        <Box
          component="header"
          sx={{
            bgcolor: '#FDFA53',
            color: '#FFFFFF',
            left: 0,
            position: 'sticky',
            right: 0,
            top: 0,
            zIndex: 'var(--MainNav-zIndex)',
          }}
        >
          <Container maxWidth="lg" sx={{ display: 'flex', minHeight: 'var(--MainNav-height)', py: '10px', ml: '-5px' }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
              <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
                <Logo color="light" height={50} width={50} />
              </Box>
              <Box component="nav" sx={{ display: { xs: 'none', md: 'block' } }}>
                <Stack component="ul" direction="row" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
                  <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex', textDecoration: 'none' }}>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      fontFamily="'Mollen Personal Use', sans-serif"
                      color="#000000"
                    >
                      MacroFlow
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Container>
        </Box>
      </div>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', minHeight: '100%' }}>
        <Box sx={{ boxShadow: 'var(--mui-shadows-8)', display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              flex: '1 1 auto',
              justifyContent: 'center',
              p: 3,
            }}
          >
            <Box sx={{ maxWidth: '420px', width: '100%' }}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
