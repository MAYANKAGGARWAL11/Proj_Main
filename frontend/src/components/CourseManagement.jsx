import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, List, ListItem, ListItemText, Card, CardContent, CardActions } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseManagement = () => {
  const { courseID } = useParams(); // Get courseID from the URL
  const [course, setCourse] = useState({});
  const [videos, setVideos] = useState([]);
  const [resources, setResources] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();

  // Fetch course details, videos, resources, assessments, and students
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch all data in parallel
        const [courseRes, videosRes, resourcesRes, assessmentsRes, studentsRes] = await Promise.all([
          axios.get(`http://localhost:8081/api/courses/${courseID}`, { headers }),
          axios.get(`http://localhost:8081/api/videos/course/${courseID}`, { headers }),
          axios.get(`http://localhost:8081/api/resources/course/${courseID}`, { headers }),
          axios.get(`http://localhost:8081/api/assessments/course/${courseID}`, { headers }),
          axios.get(`http://localhost:8081/api/enrollments/course/${courseID}/students`, { headers }),
        ]);

        setCourse(courseRes.data);
        setVideos(videosRes.data);
        setResources(resourcesRes.data);
        setAssessments(assessmentsRes.data);
        setStudents(studentsRes.data);

        if (videosRes.data.length > 0) {
          setSelectedVideo(videosRes.data[0]);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [courseID]);

  // Handlers for adding videos, resources, and assessments
  const handleAddVideo = () => navigate(`/course/${courseID}/add-video`);
  const handleAddResource = () => navigate(`/course/${courseID}/add-resource`);
  const handleAddAssessment = () => navigate(`/course/${courseID}/add-assessment`);

  // Handler for deleting a video
  const handleDeleteVideo = async (videoId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`http://localhost:8081/api/videos/${videoId}`, { headers });
      setVideos(videos.filter((video) => video.videoId !== videoId));
      alert('Video deleted successfully!');
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Failed to delete video. Please try again.');
    }
  };

  // Handlers for deleting resources and assessments
  const handleDeleteResource = async (resourceId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`http://localhost:8081/api/resources/${resourceId}`, { headers });
      setResources(resources.filter((resource) => resource.resourceId !== resourceId));
      alert('Resource deleted successfully!');
    } catch (error) {
      console.error('Error deleting resource:', error);
      alert('Failed to delete resource. Please try again.');
    }
  };

  const handleDeleteAssessment = async (assessmentID) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`http://localhost:8081/api/assessments/${assessmentID}`, { headers });
      setAssessments(assessments.filter((assessment) => assessment.assessmentID !== assessmentID));
      alert('Assessment deleted successfully!');
    } catch (error) {
      console.error('Error deleting assessment:', error);
      alert('Failed to delete assessment. Please try again.');
    }
  };

  // Handlers for navigating to student assessment results
  const handleStudentClick = (studentID) => {
    navigate(`/course/${courseID}/student/${studentID}/results`);
  };

  // Handler for navigating to assessment details
  const handleAssessmentClick = (assessmentID) => {
    navigate(`/course/${courseID}/assessment/${assessmentID}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {/* Course Title */}
      <Typography variant="h4" gutterBottom>
        Manage Course: {course.title}
      </Typography>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Sidebar */}
        <Box sx={{ width: '25%' }}>
          {/* Videos Section */}
          <Typography variant="h6" gutterBottom>
            Videos
          </Typography>
          <List>
            {videos.map((video) => (
              <ListItem
                key={video.videoId}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '12px',
                  backgroundColor: selectedVideo?.videoId === video.videoId ? 'lightblue' : 'transparent',
                  '&:hover': { backgroundColor: 'lightgray' },
                }}
              >
                <ListItemText
                  primary={video.title}
                  onClick={() => setSelectedVideo(video)}
                  sx={{ cursor: 'pointer' }}
                />
                <Button
                  size="small"
                  color="secondary"
                  variant="outlined"
                  onClick={() => handleDeleteVideo(video.videoId)}
                >
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleAddVideo}
          >
            Add Video
          </Button>

          {/* Resources Section */}
          <Typography variant="h6" sx={{ mt: 4 }}>
            Resources
          </Typography>
          {resources.map((resource) => (
            <Card key={resource.resourceId} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{resource.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Type: {resource.resourceType}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleDeleteResource(resource.resourceId)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleAddResource}
          >
            Add Resource
          </Button>

          {/* Assessments Section */}
          <Typography variant="h6" sx={{ mt: 4 }}>
            Assessments
          </Typography>
          {assessments.map((assessment) => (
            <Card key={assessment.assessmentID} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{`Assessment: ${assessment.type}`}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Max Score: {assessment.maxScore}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleAssessmentClick(assessment.assessmentID)}>
                  View
                </Button>
                <Button size="small" color="secondary" onClick={() => handleDeleteAssessment(assessment.assessmentID)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleAddAssessment}
          >
            Add Assessment
          </Button>
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Video Player */}
          {selectedVideo && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Playing: {selectedVideo.title}
              </Typography>
              <iframe
                width="100%"
                height="315"
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Box>
          )}

          {/* Enrolled Students Section */}
          <Typography variant="h5" gutterBottom>
            Enrolled Students
          </Typography>
          {students.length > 0 ? (
            <List>
              {students.map((student) => (
                <ListItem
                  button
                  key={student.userID}
                  onClick={() => handleStudentClick(student.userID)}
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '12px',
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer',
                  }}
                >
                  <ListItemText primary={student.name} secondary={student.email} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No students are enrolled in this course yet.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default CourseManagement;