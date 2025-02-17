import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#1565c0',
        color: 'white',
        py: 3,
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      <Container>
        <Typography variant="body1" align="center">
          &copy; 2025 My Restaurant App. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
