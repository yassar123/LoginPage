//Login page
import { useState } from 'react';
import { Container, Grid, Box, Typography, Snackbar, Alert, Slide } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm, FormProvider } from 'react-hook-form';
import { literal, object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import FormInput from './InputForm';
import { useSetRecoilState } from 'recoil';
import { token } from '../store/atom';

const loginSchema = object({
  email: string().min(1, 'Email is required').email('Email is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(16, 'Password must be less than 16 characters'),
  persistUser: literal(true).optional(),
});


const LoginPage = () => {  
  const navigate = useNavigate();
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });
  const tokenSetter = useSetRecoilState(token);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmitHandler = (values) => {
    setLoading(true);
    axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/login`, values).then(res => {
      const { data } = res;
      tokenSetter(data?.token);
      navigate("/search");
    }).catch(err => {
      console.error(err);
      setOpen(true);
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <Container maxWidth={false} sx={{ height: '100vh', backgroundColor: { xs: '#fff', md: '#f4f4f4' } }}>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ width: '100%', height: '100%' }}
      >
        <FormProvider {...methods}>
          <Grid
            item
            container
            sx={{
              boxShadow: { sm: '0 0 5px #ddd' },
              py: '6rem',
              px: '3rem',
            }}
          >
            <Grid item xs={12} sm={12}>
              <Box
                display='flex'
                flexDirection='column'
                component='form'
                noValidate
                autoComplete='off'
                sx={{ paddingRight: { sm: '3rem' } }}
                onSubmit={methods.handleSubmit(onSubmitHandler)}
              >
                <Typography variant='h6' component='h1' sx={{ textAlign: 'center', mb: '1.5rem' }}>
                  Log into your account
                </Typography>
                <FormInput
                  label='Enter your email'
                  type='email'
                  name='email'
                  focused
                  required
                />
                <FormInput
                  type='password'
                  label='Password'
                  name='password'
                  required
                  focused
                />
                <LoadingButton
                  loading={loading}
                  type='submit'
                  variant='contained'
                  sx={{
                    py: '0.8rem',
                    mt: 2,
                    width: '80%',
                    marginInline: 'auto',
                  }}
                >
                  Login
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={() => setOpen(false)}
        key={"top" + "center"}
        TransitionComponent={TransitionLeft}
      >
        <Alert severity="error">Authentication failed. Please check your credentials and try again.</Alert>
      </Snackbar>
    </Container>
  );
};

function TransitionLeft(props) {
  return <Slide {...props} direction="top" />;
}

export default LoginPage;