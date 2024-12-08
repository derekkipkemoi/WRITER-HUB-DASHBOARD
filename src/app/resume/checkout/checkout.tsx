'use client'
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Modal,
  IconButton,
  List, ListItem, ListItemIcon, ListItemText,
  Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { orderClient } from '@/lib/order/client';
import { OrderObjectType } from '@/types/order';
import 'intasend-inlinejs-sdk';
import { paths } from '@/paths';

declare global {
  interface Window {
    IntaSend: any;
  }
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

const CheckoutForm = () => {
  const router = useRouter();
  const orderId = localStorage.getItem('orderId');
  const [order, setOrder] = useState<OrderObjectType | null>(null);

  useEffect(() => {
    const newIntaSend = new window.IntaSend({
      publicAPIKey: "ISPubKey_test_039f5b76-80f8-4870-96af-edcfae1c340c",
      live: false //or true for live environment
    });
    newIntaSend
      .on("COMPLETE", (response: any) => {
        console.log("COMPLETE:", response);
        router.push(paths.dashboard.overview);
      })
      .on("FAILED", (response: any) => {
        console.log("FAILED", response);
      })
      .on("IN-PROGRESS", () => { console.log("IN-PROGRESS ..."); });

    const fetchOrder = async () => {
      if (orderId) {
        const { data } = await orderClient.getOrder(orderId);
        console.log("Data", data);
        setOrder(data || null);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  const formatDate = (dateString: Date) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd');
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!order) return null; // Guard clause to ensure `order` is loaded

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
        Payment and checkout
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
       Confirm payment and checkout
      </Typography>
      <Divider sx={{ height: '5px', borderColor: 'primary.main', mb: 3 }} />

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={10}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1"><strong>Order ID</strong></Typography>
                  <Typography variant="body2" sx={{ mb: 0 }}>{order.id}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1"><strong>Order Name</strong></Typography>
                  <Typography variant="body2" sx={{ mb: 0 }}>{order.package.title}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1"><strong>Order Price</strong></Typography>
                  <Typography variant="body2" sx={{ mb: 0 }}>
                    {order.package.currency.symbol}{order.package.price}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1"><strong>Order Date</strong></Typography>
                  <Typography variant="body2" sx={{ mb: 0 }}>{formatDate(order.date)}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1"><strong>Order Status</strong></Typography>
                  <Typography variant="body2" sx={{ mb: 0 }}>{order.status}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1"><strong>Order Requirements</strong></Typography>
                  {order.package.features.map((feature, index) => (
                    <Typography variant="body2" key={index} sx={{ mb: 0 }}>
                      - {feature}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleOpen}>
                  View More Details
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button className="intaSendPayButton" data-amount={order.package.price} data-currency={order.package.currency} variant="contained" color="primary">
              Confirm Payments
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Order: {order.package.title}</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            <ListItem>
              <ListItemIcon>
                {order.requireCoverLetter ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
              </ListItemIcon>
              <ListItemText primary="Order Has Cover Letter" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                {order.requireLinkedInOptimization ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
              </ListItemIcon>
              <ListItemText primary="Order Has LinkedIn Optimization" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                {order.resume ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
              </ListItemIcon>
              <ListItemText primary="Order Has File" />
            </ListItem>
            {order.template && (
              <ListItem>
                <ListItemText primary="Order Template" secondary={order.template.name} />
              </ListItem>
            )}
            <ListItem>
              <ListItemText primary="Order Status" secondary={order.status} />
            </ListItem>
          </List>
        </Box>
      </Modal>
    </Box >
  );
};

export default CheckoutForm;
