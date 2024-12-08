import React from 'react';
import { Box, Container, Grid, TextField, Button, Typography, Link, Card, CardContent, Avatar } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: 'primary.main' }}>
      <Container>
        {/* Payment Methods Section */}
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ color: 'white', mb: 1 }}>
            We accept the following payment methods:
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"  // Center the content horizontally
            sx={{ mb: 2 }}
          >
            {/* Use image URLs for the payment method avatars */}
            <Avatar
              src="/assets/master.png"
              alt="M-Pesa"
              sx={{ width: 66, height: 56, marginRight: 2 }} // Set width and height
            />
            <Avatar
              src="/assets/visa.png"
              alt="Credit Card"
              sx={{ width: 66, height: 56, marginRight: 2 }} // Set width and height
            />
            <Avatar
              src="/assets/paypal.png"
              alt="PayPal"
              sx={{ width: 66, height: 56,marginRight: 2 }} // Set width and height
            />
            <Avatar
              src="/assets/mpesa.png"
              alt="PayPal"
              sx={{ width: 150, height: 90,marginRight: 2 }} // Set width and height
            />
          </Box>
          {/* Add icons for payment methods here */}
          <Link href="/privacy-policy" color="white" variant="body2" sx={{ mb: 1 }}>
            Privacy Policy
          </Link>
          <Link href="/terms-conditions" color="white" variant="body2" sx={{ mb: 1, paddingLeft: 3 }}>
            Terms and Conditions
          </Link>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
