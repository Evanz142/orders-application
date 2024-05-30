import './base.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';
import { createClient } from '@supabase/supabase-js';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material';

const supabase = createClient('https://hfhrezvxbnkvvkujmswp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmaHJlenZ4Ym5rdnZrdWptc3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwODUxMjIsImV4cCI6MjAzMjY2MTEyMn0.HSp2UZVT6W1AxkoDUgz1cFoeXvSb7Oky2HwCUtcuOAc');

const ForgotPasswordPage = () => {
  const { session } = useSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (session) {
      navigate('/home');
    }
  }, [session, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // currently this only sends a recovery email, actually resetting the password isn't implemented yet.
    event.preventDefault();
    await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://example.com/account/update-password',
      })
  };

  if (!session) {
    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Recovery Email
            </Button>
            <Link to="/signin">Back to sign-in</Link>
          </Box>
        </Box>
      </Container>
    );
  }

  return null;
};

export default ForgotPasswordPage;
