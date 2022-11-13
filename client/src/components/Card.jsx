import React from 'react';
import { Avatar, Card, CardMedia, CardHeader, Chip, Typography, CardActions, CardContent, Container } from '@mui/material';
import { red } from '@mui/material/colors';
import LanguageIcon from '@mui/icons-material/Language';
import TheaterComedyOutlinedIcon from '@mui/icons-material/TheaterComedyOutlined';
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined';


export default function RecipeReviewCard({ data }) {
    return (
        // It will display the movie data after we search it in search bar
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {data?.show?.name[0]?.toUpperCase()}
                    </Avatar>
                }
                title={data?.show?.name}
                subheader={data?.show?.premiered}
            />
            <CardMedia
                component="img"
                height="194"
                image={data?.show?.image?.original}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary"  >
                    {data?.show?.summary}
                </Typography>
            </CardContent>
            <section>
                <CardActions disableSpacing>
                    <Chip avatar={<FastForwardOutlinedIcon />} label={data?.show?.status} />
                </CardActions>
                <CardActions disableSpacing>
                    <Chip avatar={<Avatar>{data?.show?.type[0]?.toUpperCase()}</Avatar>} label={data?.show?.type} />
                    <Chip avatar={<LanguageIcon />} label={data?.show?.language} />
                </CardActions>
                <CardActions disableSpacing>
                    {data?.show?.genres.length > 0 && <Chip avatar={<TheaterComedyOutlinedIcon />} label={data?.show?.genres?.join(", ")} />}
                </CardActions>
            </section>
        </Card>
    );
}