'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { AuthStrategy } from '@/lib/auth/strategy';
import { useUser } from '@/hooks/use-user';

import { Auth0SignOut } from './auth0-sign-out';
import { CognitoSignOut } from './cognito-sign-out';
import { CustomSignOut } from './custom-sign-out';
import { FirebaseSignOut } from './firebase-sign-out';
import { SupabaseSignOut } from './supabase-sign-out';

// const user = {
//   id: 'USR-000',
//   name: 'Sofia Rivers',
//   avatar: '/assets/avatar.png',
//   email: 'sofia@devias.io',
// } satisfies User;

export interface UserPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open: boolean;
}

export function UserPopover({ anchorEl, onClose, open }: UserPopoverProps): React.JSX.Element {
  const { user } = useUser();

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      onClose={onClose}
      open={Boolean(open)}
      slotProps={{ paper: { sx: { width: '280px' } } }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <Box sx={{ p: 2 }}>
        <Typography>{user?.name}</Typography>
        <Typography color="text.secondary" variant="body2">
          {user?.email}
        </Typography>
      </Box>
      <Divider />
      {/* <List sx={{ p: 1 }}>
        <MenuItem component={RouterLink} href={paths.dashboard.settings.account} onClick={onClose}>
          <ListItemIcon>
            <UserIcon />
          </ListItemIcon>
          Account
        </MenuItem>
        <MenuItem onClick={onClose}>
          <ListItemIcon>
            <LockKeyIcon />
          </ListItemIcon>
          Security
        </MenuItem>
        <MenuItem onClick={onClose}>
          <ListItemIcon>
            <CreditCardIcon />
          </ListItemIcon>
          Billing
        </MenuItem>
      </List> */}
      {/* <Divider /> */}
      <Box sx={{ p: 1 }}>
        {config.auth.strategy === AuthStrategy.CUSTOM ? <CustomSignOut /> : null}
        {config.auth.strategy === AuthStrategy.AUTH0 ? <Auth0SignOut /> : null}
        {config.auth.strategy === AuthStrategy.COGNITO ? <CognitoSignOut /> : null}
        {config.auth.strategy === AuthStrategy.FIREBASE ? <FirebaseSignOut /> : null}
        {config.auth.strategy === AuthStrategy.SUPABASE ? <SupabaseSignOut /> : null}
      </Box>
    </Popover>
  );
}
