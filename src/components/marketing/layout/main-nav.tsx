'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import type { SupabaseClient } from '@supabase/supabase-js';

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { createClient as createSupabaseClient } from '@/lib/supabase/client';
import { Dropdown } from '@/components/core/dropdown/dropdown';
import { DropdownPopover } from '@/components/core/dropdown/dropdown-popover';
import { DropdownTrigger } from '@/components/core/dropdown/dropdown-trigger';
import { Logo } from '@/components/core/logo';
import { toast } from '@/components/core/toaster';

import { MobileNav } from './mobile-nav';

export function MainNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const [supabaseClient] = React.useState<SupabaseClient>(createSupabaseClient());
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  React.useEffect(() => {
    if (code) {
      toast.success(
        <div style={{ textAlign: 'center', fontWeight: '500', lineHeight: '1.5' }}>
          Login successfully <br />
        </div>,
        {
          icon: '⚡', // Custom icon for a modern touch
          duration: 4000, // Display duration in milliseconds
          style: {
            borderRadius: '8px',
            borderColor: 'rgba(0, 0, 0, 0.8)',
            background: '#F9FAFB', // Light modern background
            color: '#333', // Dark text for better readability
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '12px 16px',
            fontSize: '14px',
          },
        }
      );
    }
  }, []);

  const handleSignOut = React.useCallback(async (): Promise<void> => {
    try {
      const { error } = await supabaseClient.auth.signOut();

      if (error) {
        logger.error('Sign out error', error);
        toast.error('Something went wrong, unable to sign out');
      } else {
        // UserProvider will handle Router refresh
        // After refresh, GuestGuard will handle the redirect
        window.location.replace('/');
      }
    } catch (err) {
      logger.error('Sign out error', err);
      toast.error('Something went wrong, unable to sign out');
    }
  }, [supabaseClient]);

  return (
    <React.Fragment>
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
        <Container maxWidth="lg" sx={{ display: 'flex', minHeight: 'var(--MainNav-height)', py: '10px' }}>
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
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: 'center', flex: '1 1 auto', justifyContent: 'flex-end' }}
          >
            {code !== null ? (
              <Button
                component="a"
                onClick={handleSignOut}
                variant="contained"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  backgroundColor: '#D51331', // Set button color
                  color: '#FFFFFF',
                  borderRadius: '20px', // Increased border radius
                  fontSize: '1.1rem', // Slightly larger font size
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                component="a"
                href={paths.auth.supabase.signIn}
                variant="contained"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  backgroundColor: '#D51331', // Set button color
                  color: '#FFFFFF',
                  borderRadius: '20px', // Increased border radius
                  fontSize: '1.1rem', // Slightly larger font size
                  '&:hover': { backgroundColor: '#B01129' }, // Slightly darker shade on hover
                }}
              >
                Login
              </Button>
            )}
            <IconButton
              onClick={() => {
                setOpenNav(true);
              }}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <ListIcon />
            </IconButton>
          </Stack>
        </Container>
      </Box>
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}

interface NavItemProps extends Omit<NavItemConfig, 'key' | 'items'> {
  children?: React.ReactNode;
  pathname: string;
}

export function NavItem({
  children,
  disabled,
  external,
  href,
  matcher,
  pathname,
  title,
}: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const hasPopover = Boolean(children);

  const element = (
    <Box component="li" sx={{ userSelect: 'none' }}>
      <Box
        {...(hasPopover
          ? {
              onClick: (event: React.MouseEvent<HTMLElement>): void => {
                event.preventDefault();
              },
              role: 'button',
            }
          : {
              ...(href
                ? {
                    component: external ? 'a' : RouterLink,
                    href,
                    target: external ? '_blank' : undefined,
                    rel: external ? 'noreferrer' : undefined,
                  }
                : { role: 'button' }),
            })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--mui-palette-neutral-300)',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          textAlign: 'left',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(disabled && {
            bgcolor: 'var(--mui-palette-action-disabledBackground)',
            color: 'var(--mui-action-disabled)',
            cursor: 'not-allowed',
          }),
          ...(active && { color: 'var(--mui-palette-common-white)' }),
          '&:hover': {
            ...(!disabled &&
              !active && { bgcolor: 'rgba(255, 255, 255, 0.04)', color: 'var(--mui-palette-common-white)' }),
          },
        }}
        tabIndex={0}
      >
        <Box component="span" sx={{ flex: '1 1 auto' }}>
          <Typography
            component="span"
            sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
        {hasPopover ? (
          <Box sx={{ alignItems: 'center', color: 'inherit', display: 'flex', flex: '0 0 auto' }}>
            <CaretDownIcon fontSize="var(--icon-fontSize-sm)" />
          </Box>
        ) : null}
      </Box>
    </Box>
  );

  if (hasPopover) {
    return (
      <Dropdown>
        <DropdownTrigger>{element}</DropdownTrigger>
        <DropdownPopover
          PaperProps={{ sx: { width: '800px', maxWidth: '100%' } }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          {children}
        </DropdownPopover>
      </Dropdown>
    );
  }

  return element;
}
