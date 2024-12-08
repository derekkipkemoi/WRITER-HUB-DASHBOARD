'use client'

import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr';

import { LatestOrders,} from '@/components/dashboard/overview/latest-latest';
import { Button, Stack, Typography } from '@mui/material';
import { orderClient } from '@/lib/order/client';
import { OrderObjectType } from '@/types/order';

// export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    // }, [orders]); // Run this whenever orders change
    const [orders, setOrders] = React.useState<OrderObjectType[]>([]);

    
    // Fetch order details
    const fetchOrder = async () => {
      const { data } = await orderClient.getUserOrders();
      if (data) {
        setOrders(data); // data is now guaranteed to be an array
      }
    };
    
    React.useEffect(() => {
      fetchOrder();
    }, []);
    
  
    const updateHappened=(updated: Boolean)=>{
      if(updated){
        fetchOrder()
      }
    }
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">All Orders</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button variant="contained">
            Order CV & Cover Letter Now!!
          </Button>
        </div>
      </Stack>
    <Grid container spacing={3}>
      <Grid lg={12} md={12} xs={12}>
      <LatestOrders updateHappened={updateHappened} orders={orders} title="All Orders" />
      </Grid>
      </Grid>
    </Stack>
  );
}
