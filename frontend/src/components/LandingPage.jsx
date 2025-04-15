import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LandingPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/courses/public'); // Public endpoint for courses
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses. Please try again later.');
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to E-Learning Platform
        </Typography>
        <Typography variant="h6" gutterBottom>
          Learn and teach with ease.
        </Typography>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Courses We Offer
        </Typography>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.courseID}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{course.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {course.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => navigate('/login')}
                    >
                      Enroll Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default LandingPage;