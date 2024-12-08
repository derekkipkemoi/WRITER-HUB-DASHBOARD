import * as React from 'react';
import Box from '@mui/material/Box';

import { GuestGuard } from '@/components/auth/guest-guard';

export interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
      <Box
        sx={{
          display: { xs: 'flex', lg: 'grid' },
          flexDirection: 'column',
          minHeight: '100%',
        }}
      >
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', flex: '1 1 auto', justifyContent: 'center'}}> {/* Reduced padding here */}
            <Box sx={{  width: '100%' }}>{children}</Box>
          </Box>
        </Box>
      </Box>
  );
}

export default Layout;
