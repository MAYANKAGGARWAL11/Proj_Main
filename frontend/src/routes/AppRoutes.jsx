import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import LoginPage from '../components/LoginPage';
import RegistrationPage from '../components/RegistrationPage';
import UserDashboard from '../components/UserDashboard';
import InstructorDashboard from '../components/InstructorDashboard';
import AddCourse from '../components/AddCourse';
import CourseManagement from '../components/CourseManagement';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import AddVideo from '../components/AddVideo';
import AddResource from '../components/AddResource';
import AddAssessment from '../components/AddAssessment';
import AssessmentDetails from '../components/AssessmentDetails';

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor-dashboard"
          element={
            <ProtectedRoute role="INSTRUCTOR">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-course"
          element={
            <ProtectedRoute role="INSTRUCTOR">
              <AddCourse />
            </ProtectedRoute>
          }
        />
       

<Route
  path="/course/:courseID/add-assessment"
  element={
    <ProtectedRoute role="INSTRUCTOR">
      <AddAssessment />
    </ProtectedRoute>
  }
/>

<Route
  path="/course/:courseID/assessment/:assessmentID"
  element={
    <ProtectedRoute role="INSTRUCTOR">
      <AssessmentDetails />
    </ProtectedRoute>
  }
/>
        
<Route
  path="/course/:courseID/add-resource"
  element={
    <ProtectedRoute role="INSTRUCTOR">
      <AddResource />
    </ProtectedRoute>
  }
/>
        {/* Add the Course Management route */}
        <Route
          path="/course/:courseID/video/:videoID"
          element={
            <ProtectedRoute role="INSTRUCTOR">
              <CourseManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseID"
          element={
            <ProtectedRoute role="INSTRUCTOR">
              <CourseManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseID/add-video"
          element={
            <ProtectedRoute role="INSTRUCTOR">
              <AddVideo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;