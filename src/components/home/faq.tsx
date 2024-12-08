"use client"
import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Container, CardActions, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ArrowCircleRight } from '@mui/icons-material';
import { styled } from '@mui/material/styles'; // Corrected import


// Define a styled component for the blinking icon
const BlinkingIcon = styled(ArrowCircleRight)(({ theme }) => ({
  animation: 'blink 1s infinite', // Animation duration can be adjusted
  '@keyframes blink': {
    '0%': { color: 'white' }, // Start with green
    '50%': { color: 'green' }, // Change to yellow at 50%
    '100%': { color: 'white' }, // Go back to green
  },
}));

const faqData = [
  {
    question: "What is included in a professional resume writing service?",
    answer: "A professional resume writing service includes a personalized resume tailored to your industry and career goals, a cover letter, and LinkedIn profile optimization."
  },
  {
    question: "How long does it take to get my resume?",
    answer: "The turnaround time for a professional resume typically ranges from 6 to 24 hours, depending on the complexity of the job."
  },
  {
    question: "Can you help with specific job applications?",
    answer: "Yes, our writers can tailor your resume and cover letter to specific job applications to help you stand out to potential employers."
  },
  {
    question: "Do you offer interview coaching?",
    answer: "Yes, we offer job interview coaching services to help you prepare and increase your chances of success in interviews."
  },
  {
    question: "What if I am not satisfied with my resume?",
    answer: "We offer a satisfaction guarantee, and we will work with you to make necessary revisions until you are satisfied with your resume."
  }
];

// Define a styled component for the blinking icon


interface FAQSectionProps {
  scrollToPricing: () => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({ scrollToPricing }) => {

  return (
    <Container sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          // textTransform: 'uppercase',
          mb: 2,
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
        }}
      >
        Frequently Asked Questions
      </Typography>


      {faqData.map((faq, index) => (
        <Accordion key={index} sx={{ marginBottom: '10px', borderRadius: '8px', boxShadow: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{
              bgcolor: 'background.paper', // Background color for the summary
              borderRadius: '8px', // Rounded corners
              '&:hover': { // Hover effect
                bgcolor: 'action.hover', // Change background on hover
              },
              transition: 'background-color 0.3s', // Smooth transition
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'text.primary', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', }}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              bgcolor: 'background.default', // Background color for the details
              padding: '16px', // Add padding to the details
            }}
          >
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>

      ))}
      <CardActions sx={{ justifyContent: 'center', marginBottom: '20px', marginTop: '10px' }}>
        <Button
          variant="contained"
          onClick={scrollToPricing}
          sx={{
            backgroundColor: '#ffcc00',
            color: '#000',
            padding: '10px 20px',
            fontSize: '1rem',
            borderRadius: '25px',
            transition: 'transform 0.3s',
            textTransform: 'uppercase',
            '&:hover': {
              backgroundColor: '#ffb300', // Adjust background color on hover
              transform: 'scale(1.05)', // Add scaling effect on hover
            },
          }}
        >
          Select Package To Get Started Now
          <BlinkingIcon sx={{ marginLeft: '8px' }} />
        </Button>
      </CardActions>
    </Container>
  );
};

export default FAQSection;
