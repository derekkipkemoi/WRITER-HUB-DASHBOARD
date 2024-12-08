import React from 'react';
import { Box, Button, Typography, CardContent, CardActions, Divider, Container } from '@mui/material';
import { ArrowCircleRight, CheckCircle as CheckCircleIcon, Star } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const BlinkingIcon = styled(ArrowCircleRight)(({ theme }) => ({
  animation: 'blink 1s infinite',
  '@keyframes blink': {
    '0%': { color: 'white' },
    '50%': { color: 'black' },
    '100%': { color: 'white' },
  },
}));

const services = [
  "Expert CV Writing",
  "Personalized Cover Letter Crafting",
  "LinkedIn Profile Enhancement",
  "Tailored Resume Templates",
  "ATS-Friendly Resume Optimization",
  "Comprehensive User Dashboard & Support"
];

interface HeroSectionProps {
  scrollToPricing: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ scrollToPricing }) => {
  return (
    <Container sx={{ padding: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          // paddingTop: { xs: 4, md: 8 },
          // paddingBottom: { xs: 4, md: 8 },
          borderRadius: '8px',
        }}
      >
        {/* Left Section */}
        <Box sx={{ flex: 1.5 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="left"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
            }}
          >
            Premier CV & Resume Writing Services
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="left"
            sx={{
              marginBottom: 2,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
            }}
          >
            Unlock Your Career Potential with Expertly Crafted CVs and Resumes
          </Typography>
          <CardContent sx={{ padding: 0 }}>
            {services.map((service, index) => (
              <Typography
                key={index}
                variant="h6"
                color="text.secondary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 1,
                  fontSize: '1.1rem',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                  textTransform: 'uppercase',  // This line makes the text uppercase
                }}
              >
                <Star sx={{ color: 'primary.main', marginRight: 1 }} />
                {service}
              </Typography>
            ))}
            <Divider sx={{ margin: '5px 0', backgroundColor: 'primary.main', height: '3px' }} />
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={scrollToPricing}
              sx={{
                backgroundColor: '#ffcc00',
                color: '#000',
                marginTop: '20px',
                // padding: '10px 20px',
                fontSize: '1rem',
                borderRadius: '25px',
                transition: 'transform 0.3s',
                textTransform: 'uppercase', 
                '&:hover': {
                  backgroundColor: '#ffb300',
                  transform: 'scale(1.05)',

                },
              }}
            >
              Select Package To Get Started Now
              <BlinkingIcon sx={{ marginLeft: '1px' }} />
            </Button>
          </CardActions>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            flex: 1,
            textAlign: 'center',
            marginBottom: { xs: 4, md: 0 },
            paddingRight: { md: 2 },
          }}
        >
          <Box
            component="img"
            src="/assets/our_writer.webp"
            alt="Smiling woman using a laptop in a modern workspace."
            sx={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: 2,
              maxHeight: '350px',
              objectFit: 'cover',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};
