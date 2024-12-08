'use client';
import * as React from 'react';
import ResumeUploads from '@/components/resume/resume-upload';
import { Box, Button, Divider, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';
import { SectionsButtons } from '@/app/dashboard/account/sections-buttons';
import { orderClient } from '@/lib/order/client';
import { OrderObjectType } from '@/types/order';

const MainUploadSection: React.FC = () => {
  const [index, setIndex] = React.useState(0);
  const [isPending, setIsPending] = React.useState(false)
  const [orderId, setOrderId] = React.useState<string | null>(localStorage.getItem('orderId'));
  const router = useRouter();
  const [order, setOrder] = React.useState<OrderObjectType | null>(null)

  const fetchOrder = async () => {
    if (orderId) {
      setIsPending(true)
      const { data } = await orderClient.getOrder(orderId)
      if (data) {
        setOrder(data)
        setIsPending(false)
      }
    }
  };

  const resumeUploaded = async (uploaded: Boolean) => {
    if (uploaded) {
      fetchOrder()
    }
  }

  const incrementIndex = async () => {
    if (index < 1) {
      setIndex(index + 1);
    }
    if (index === 1) {
      setIsPending(true)
      router.push(paths.resume.end);
    }
  };


  const decrementIndex = () => {
    setIndex(index > 0 ? index - 1 : index);
  };

  const renderForm = () => {
    switch (index) {
      case 0:
        return <ResumeUploads resumeUploaded={resumeUploaded} order={order} />;
      case 1:
        return <SectionsButtons />;
      default:
        return null;
    }
  };

  return (
    <Stack>
      <div>
        {index === 0 && (
          <div>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              Upload your CV (Drag & drop or browse)
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Choose your already existing CV document from your device
            </Typography>
            <Divider sx={{ height: '5px', borderColor: 'primary.main' }} />
          </div>
        )}
        {index === 1 && (
          <div>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              You can add more CV/RESUME sections (Optional)
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Choose a section to add or update in your resume
            </Typography>
            <Divider sx={{ height: '5px', borderColor: 'primary.main' }} />
            {isPending && (
              <LinearProgress sx={{ width: '100%' }} />
            )}
          </div>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, flexWrap: { xs: 'wrap', md: 'nowrap' }, my: 3 }}>
          <Grid item lg={12} md={12} xs={12}>
            {renderForm()}
          </Grid>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: 2 }}>
          <div>
            {index > 0 && (
              <Button variant="contained" sx={{ borderRadius: '25px' }} onClick={decrementIndex} color="secondary">
                Previous
              </Button>
            )}
          </div>
          {order && order.resume && order.resume.name ? (
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
          ) : null}

        </Box>
      </div>
    </Stack>
  );
};

export default MainUploadSection;
