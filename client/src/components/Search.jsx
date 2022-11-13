import { Container, Grid, Box, Typography, Snackbar, Slide, Alert } from '@mui/material';
import { useState } from 'react';
import styled from '@emotion/styled';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm, FormProvider } from 'react-hook-form';
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios";
import { useRecoilValue } from "recoil";

import FormInput from './InputForm';
import { token } from "../store/atom";
import Card from "./Card";

const StyledGrid = styled(Grid)`
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
    justify=content: center;
    margin-top: 2rem;
    gap: 10px;
    margin-bottom: 5rem;
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr); 
    }
    @media (max-width: 480px) {
        grid-template-columns: repeat(1, 1fr); 
    }
`;

const Search = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [movies, setMovies] = useState([]);
    const tokenValue = useRecoilValue(token);

    const methods = useForm({
        resolver: zodResolver(object({
            movie: string().min(1, 'Movie name is required')
        })),
        defaultValues: {
            movie: ''
        }
    });
    const onSubmitHandler = (values) => {
        if(!tokenValue){
            setOpen(true);
            return;
        }
        setLoading(true);
        axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/search?title=${values?.movie}`, {
            headers: {
                "x-access-token": tokenValue
            }
        })
            .then(res => {
                const { data } = res;
                setMovies(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <Container maxWidth={false} sx={{ height: '100vh', backgroundColor: { xs: '#fff', md: '#f4f4f4' } }}>
            <Grid
                container
                justifyContent='center'
                alignItems='center'
                sx={{ width: '100%' }}
            >

                <Grid item sx={{ maxWidth: '70rem', width: '100%', backgroundColor: '#fff' }}>
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
                                    sx={{ paddingRight: { sm: '3rem' } }}
                                    onSubmit={methods.handleSubmit(onSubmitHandler)}
                                >
                                    <Typography variant='h6' component='h1' sx={{ textAlign: 'center', mb: '1rem' }}>
                                        Search Movies
                                    </Typography>
                                    <FormInput
                                        label='Enter movie name'
                                        type='text'
                                        name='movie'
                                        focused
                                        required
                                    />
                                    <LoadingButton
                                        loading={loading}
                                        type='submit'
                                        variant='contained'
                                        sx={{
                                            py: '0.8rem',
                                            mt: 2,
                                            width: '40%',
                                            marginInline: 'auto',
                                        }}
                                    >
                                        Search
                                    </LoadingButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </FormProvider>
                </Grid>
            </Grid>
            <StyledGrid>
                {movies && movies.map((movie, idx) => <Card key={idx} data={movie} />)}
            </StyledGrid>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={open}
                onClose={() => setOpen(false)}
                key={"top" + "center"}
                TransitionComponent={TransitionLeft}
            >
                <Alert severity="error">Login credentials not found. Please login and try again.</Alert>
            </Snackbar>
        </Container>)
}

function TransitionLeft(props) {
    return <Slide {...props} direction="top" />;
}

export default Search;