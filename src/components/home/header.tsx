import { Box, Button, Typography, AppBar, Toolbar } from '@mui/material';

export const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <img
          src="/assets/cv.png" // Replace with your logo's path
          alt="Logo"
          style={{ height: '40px', marginRight: '16px' }} // Adjust height and margin as needed
        />
        <Typography variant="h6" sx={{ flexGrow: 1,textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', }}>
          CV WRITERS HUB
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" sx={{ mr: 2 }}>
            LOGIN
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
