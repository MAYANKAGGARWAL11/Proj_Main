import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const StudentAssessmentResults = () => {
  const { courseID, studentID } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchAssessmentResults = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:8081/api/submissions/course/${courseID}/student/${studentID}/results`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching assessment results:', error);
      }
    };

    fetchAssessmentResults();
  }, [courseID, studentID]);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Assessment Results
      </Typography>
      <List>
        {results.map((result) => (
          <ListItem key={result.submissionId}>
            <ListItemText
              primary={`Assessment ID: ${result.assessmentId}`}
              secondary={`Score: ${result.score}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default StudentAssessmentResults;