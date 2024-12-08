import React from 'react';
import { Box, Card, CardContent, CardHeader, Button, Grid, Typography, Divider, Container } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CurrencyType } from '@/types/order';


// Mock function to get the user's currency and format prices
const getCurrency = () => {
  return {
    symbol: 'USD', // Kenyan Shilling for example
    rate: 1, // Conversion rate, assuming prices are already in KES
  };
};
const currency = getCurrency();

const formatPrice = (price: number, currency: CurrencyType): string => {
  return `${currency.symbol} ${price * currency.rate}`;
};



const pricingOptions = [
  {
    title: 'Standard CV Writing',
    price: 15,
    currency: currency,
    orderRevision: 1,
    description: 'A professional CV writing service designed to showcase your skills and experience effectively',
    features: [
      'Custom CV by a professional writer',
      'One revision round',
      'ATS optimization',
      'Download in PDF/DOCX',
      'Professional formatting',
    ],
    highlight: false,
  },
  {
    title: 'Premium CV Writing',
    price: 30,
    currency: currency,
    orderRevision: 3,
    description: 'A comprehensive CV and cover letter writing service tailored for career advancement.',
    features: [
      'Bespoke CV by a senior writer',
      'Three revision rounds',
      'ATS optimization',
      'Download in PDF/DOCX',
      'Professional formatting',
      'Custom cover letter',
      'Priority support',
      'LinkedIn profile optimization',
    ],
    highlight: true,
  },
  {
    title: 'Executive CV Writing',
    price: 50,
    currency: currency,
    orderRevision: 10,
    description: 'An elite CV writing service for executives, highlighting leadership and strategic vision.',
    features: [
      'Tailored CV by an executive writer',
      'Unlimited revisions',
      'ATS optimization',
      'Download in PDF/DOCX',
      'Professional formatting',
      'Custom cover letter',
      'Priority support',
      'LinkedIn profile optimization',
      'Executive biography',
    ],
    highlight: false,
  },
  {
    title: 'Cover Letter Writing',
    price: 5,
    currency: currency,
    orderRevision: 1,
    description: 'A professionally crafted cover letter to complement your CV and enhance your job applications.',
    features: [
      'Custom cover letter by a professional writer',
      'One revision round',
      'Tailored to job applications',
      'Professional formatting',
    ],
    highlight: false,
  },
  {
    title: 'LinkedIn Profile Optimization',
    price: 10,
    currency: currency,
    orderRevision: 1,
    description: 'Optimize your LinkedIn profile to attract recruiters and showcase your professional brand.',
    features: [
      'LinkedIn profile review and rewrite',
      'SEO optimization',
      'Professional formatting',
      'Profile image recommendations',
      'Custom headline and summary',
    ],
    highlight: false,
  },
];

export const PricingCards: React.FC = () => {
  const handlePackageSelect = () => {
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 2,
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
        }}
      >
        Our Pricing Options
      </Typography>
      <Typography
        variant="body1"
        component="p"
        gutterBottom
        align="center"
        sx={{
          maxWidth: '600px',
          mx: 'auto',
          lineHeight: 1.6,
          color: 'text.secondary',
          fontSize: '1.1rem',
          padding: '0 16px',
          paddingBottom: 2,
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
        }}
      >
        Choose from our range of CV writing services to find the one that suits your career goals best. Each package is tailored to meet your specific needs.
      </Typography>

      <Container>
        <Grid container spacing={3} justifyContent="center">
          {pricingOptions.map((option, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                variant="outlined"
                sx={{
                  textAlign: 'center',
                  height: '100%',
                  boxShadow: option.highlight ? 6 : 3,
                  borderRadius: 2,
                  position: 'relative',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'scale(1.03)',
                    transition: '0.3s ease-in-out',
                  },
                  bgcolor: '#ffffff',
                  border: option.highlight ? `2px solid primary.main` : 'none',
                }}
              >
                <CardHeader
                  title={option.title}
                  sx={{
                    backgroundColor: option.highlight ? 'primary.main' : 'transparent',
                    color: option.highlight ? 'white' : 'text.primary',
                    borderTopLeftRadius: 2,
                    borderTopRightRadius: 2,
                    fontSize: '1.5rem',
                    padding: '16px 0',
                  }}
                />
                <Divider sx={{ backgroundColor: 'primary.main', height: '2px' }} />
                <CardContent sx={{ padding: '24px 16px' }}>
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 2,
                      fontWeight: 'bold',
                      borderBottom: `2px solid primary.main`,
                      display: 'inline-block',
                      paddingBottom: '4px',
                    }}
                  >
                    {formatPrice(option.price, option.currency)}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      lineHeight: 1.6,
                    }}
                  >
                    {option.description}
                  </Typography>
                  <Divider sx={{ margin: '10px 0', backgroundColor: 'primary.main', height: '2px' }} />
                  <Box sx={{ mb: 3, textAlign: 'left' }}>
                    {option.features.map((feature, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 0.5,
                          '&:before': {
                            content: '""',
                            color: 'primary.main',
                            marginRight: 1,
                          },
                          '& svg': {
                            marginRight: 1,
                          },
                        }}
                      >
                        <CheckCircleIcon sx={{ color: 'primary.main', fontSize: '1rem' }} />
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: 20,
                      padding: '10px 20px',
                      fontSize: '1rem',
                      textTransform: 'none',
                    }}
                    onClick={() => handlePackageSelect()}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
