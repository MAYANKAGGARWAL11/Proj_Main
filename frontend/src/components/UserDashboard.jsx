import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const UserDashboard = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to your dashboard. Here you can view your courses, progress, and more.
      </Typography>
      <Button variant="contained" color="primary">
        View Courses
      </Button>
    </Container>
  );
};

export default UserDashboard;