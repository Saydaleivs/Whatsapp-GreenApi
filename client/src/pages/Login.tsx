import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import checkAuthStatus from '../services/checkAuthStatus';
const defaultTheme = createTheme();

type LoginData = {
  IdInstance: string;
  ApiTokenInstance: string;
  number: number;
};

export default function Login({ setIsAuth }) {
  const navigate = useNavigate();
  const [data, setData] = React.useState<LoginData>({
    IdInstance: '',
    ApiTokenInstance: '',
    number: 0,
  });

  function handleChange(event: React.SyntheticEvent) {
    setData({
      ...data,
      [event.currentTarget.id]: (event.target as HTMLInputElement).value,
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (data.IdInstance && data.ApiTokenInstance) {
      localStorage.setItem('idInstance', data.IdInstance);
      localStorage.setItem('ApiTokenInstance', data.ApiTokenInstance);
      setIsAuth(checkAuthStatus());
      navigate('/chat');
      return;
    }
    alert('fill all fields');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              onChange={handleChange}
              id='IdInstance'
              label='IdInstance'
              name='IdInstance'
              type='number'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              onChange={handleChange}
              name='ApiTokenInstance'
              label='ApiTokenInstance'
              type='text'
              id='ApiTokenInstance'
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href='https://green-api.com' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
