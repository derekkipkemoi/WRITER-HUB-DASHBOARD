'use client';
import * as React from 'react';
import { Box, Button, Divider, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import CoverLetter from '@/components/resume/cover-letter';
import { TemplatesSlider } from '@/components/resume/template-slider';
import { useRouter } from 'next/navigation'
import { paths } from '@/paths';

const EndSection: React.FC = () => {
  const router = useRouter();

  const [index, setIndex] = React.useState(0);
  const [currentComponent, setCurrentComponent] = React.useState("");
  const [isPending, setIspending] = React.useState(false)

  const incrementIndex = () => {
    if (index < 1) {
      setIndex(index + 1);
    }
    if (currentComponent === "CoverLetter") {
      setIspending(true)
      router.push(paths.resume.checkout);
    }
  };

  const decrementIndex = () => {
    setIndex(index > 0 ? index - 1 : index);
  };

  const renderForm = () => {
    switch (index) {
      case 0:
        return <TemplatesSlider />;
      case 1:
        return <CoverLetter />;
    }
  };

  React.useEffect(() => {
    const content = renderForm();
    console.log('Current form content:', content?.type.name);
    setCurrentComponent(content?.type.name)
  }, [index]); // Add dependencies to log when content changes
  return (
    <Stack>

      {index === 0 && (
        <div>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            Select a template of your choice (Optional)
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary' }}
          >
            Template will structure how your CV / Resume looks
          </Typography>
          <Divider sx={{ height: '5px', borderColor: 'primary.main' }} />
        </div>
      )}
      {index === 1 && (
        <div>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            Cover Letter & LinkedIn Optimization (Optional)
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary' }}
          >
            Cover Letter and Linked Optimization is based on your pricing package
          </Typography>
          <Divider sx={{ height: '5px', borderColor: 'primary.main' }} />
          {isPending && (
            <LinearProgress sx={{ width: '100%' }} />
          )}
        </div>
      )}
      <Box sx={{ my: 3 }}>
        <Grid item lg={12} md={12} xs={12}>
          {renderForm()}
        </Grid>
      </Box>

      {/* Navigation Buttons Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: 2 }}>
        <div>
          {index > 0 && (
            <Button
              variant="contained"
              sx={{
                borderRadius: '25px',
                backgroundColor: 'secondary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                },
              }}
              onClick={decrementIndex}
            >
              Previous
            </Button>
          )}
        </div>

        <Button
          variant="contained"
          onClick={incrementIndex}
          sx={{
            backgroundColor: 'warning.main',
            color: 'black',
            borderRadius: '25px',
            '&:hover': {
              backgroundColor: 'warning.dark',
            },
          }}
        >
          Next
        </Button>
      </Box>
    </Stack>
  );
};

export default EndSection;
