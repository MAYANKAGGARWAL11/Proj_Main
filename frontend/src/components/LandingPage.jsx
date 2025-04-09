import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to E-Learning Platform
        </Typography>
        <Typography variant="h6" gutterBottom>
          Learn and teach with ease.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/login')}
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default LandingPage;