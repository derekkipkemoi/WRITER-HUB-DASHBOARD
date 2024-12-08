'use client'
import * as React from 'react';
import Grid from '@mui/material/Grid';

import { CompletedOrders } from '@/components/dashboard/overview/completedOrders';
import { InprogressOrders } from '@/components/dashboard/overview/inprogressOrders';
import { LatestOrders } from '@/components/dashboard/overview/latest-latest';
import { AllOrders } from '@/components/dashboard/overview/AllOrders';
import { Button, Stack } from '@mui/material';
import { AuthGuard } from '@/components/auth/auth-guard';
import { orderClient } from '@/lib/order/client';
import { OrderObjectType } from '@/types/order';


export default function Page(): React.JSX.Element {
  const [orders, setOrders] = React.useState<OrderObjectType[]>([]);
  const [completedOrders, setCompletedOrders] = React.useState<OrderObjectType[]>([]);
  const [inProgressOrders, setInProgressOrders] = React.useState<OrderObjectType[]>([]);
  const [inRevisionOrders, setInRevisionOrders] = React.useState<OrderObjectType[]>([]);
  
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
  
  React.useEffect(() => {
    // Filter completed and in-progress orders based on the status
    const completed = orders.filter(order => order.status === "Complete");
    const inProgress = orders.filter(order => order.status === "InProgress");
    const inRevision = orders.filter(order => order.status === "Revision");
  
    setCompletedOrders(completed);
    setInProgressOrders(inProgress);
    setInRevisionOrders(inRevision);
  }, [orders]); // Run this whenever orders change

  const updateHappened=(updated: Boolean)=>{
    if(updated){
      fetchOrder()
    }
  }
  
  return (
    <AuthGuard>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Button variant="contained">
            Order CV & Cover Letter
          </Button>
        </Stack>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xs={12}> {/* Added item prop */}
            <AllOrders label={"All Orders"} sx={{ height: '100%' }} value={orders.length.toString()} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}> {/* Added item prop */}
            <CompletedOrders label={"Completed Orders"} sx={{ height: '100%' }} value={completedOrders.length.toString()} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}> {/* Added item prop */}
            <InprogressOrders label={"Orders In Progress"} sx={{ height: '100%' }} value={inProgressOrders.length.toString()} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}> {/* Added item prop */}
            <InprogressOrders label={"Orders In Revision"} sx={{ height: '100%' }} value={inRevisionOrders.length.toString()} />
          </Grid>
          <Grid item lg={12} md={12} xs={12}> {/* Added item prop */}
          <LatestOrders updateHappened={updateHappened} orders={orders} title="All Orders" />
          </Grid>
        </Grid>
      </Stack>
    </AuthGuard>
  );
}
