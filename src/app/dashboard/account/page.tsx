import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@/config';
import { Box, Divider, Typography } from '@mui/material';
import { SectionsButtons } from './sections-buttons';
import { any } from 'zod';


export const metadata = { title: `Account | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (


    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 0 }}>
        Select section to ADD or EDIT
      </Typography>
      <Divider sx={{ my: 2, height: '5px', borderColor: 'primary.main' }} />
      <Box sx={{ width: '100%' }}><SectionsButtons sectionButtonSelected={null} /></Box>
    </Box>

  );
}
