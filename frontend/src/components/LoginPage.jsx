import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER'); // Default role is USER
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      // Determine the endpoint based on the selected role
      const endpoint =
        role === 'INSTRUCTOR'
          ? 'http://localhost:8081/api/instructors/login'
          : 'http://localhost:8081/api/users/login';

      const response = await axios.post(endpoint, { email, password });

      if (!response.data || !response.data.token) {
        throw new Error('Invalid login response. Token is missing.');
      }

      const { token } = response.data;

      // Decode the JWT token to extract roles
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const roles = decodedToken.roles;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Update AuthContext
      setAuth({ token, role: roles[0] });

      // Redirect based on roles
      if (roles.includes('INSTRUCTOR')) {
        navigate('/instructor-dashboard');
      } else if (roles.includes('USER')) {
        navigate('/user-dashboard');
      } else {
        alert('Invalid role. Please contact support.');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box sx={{ mt: 3 }}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          select
          label="Role"
          fullWidth
          margin="normal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="USER">User</MenuItem>
          <MenuItem value="INSTRUCTOR">Instructor</MenuItem>
        </TextField>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account? <a href="/register">Register here</a>
      </Typography>
    </Container>
  );
};

export default LoginPage;