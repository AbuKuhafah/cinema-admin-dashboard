import React from 'react';
import './movieList.css';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getMovies, updateViews } from "../data/repository";
import { useState, useEffect } from 'react';


function MovieList(props) {
    const [movies, setMovies] = useState(null);

    // Load movies.
    useEffect(() => {
        async function loadMovies() {
            try {
                const currentMovies = await getMovies();
                console.log(" currentMovies ", currentMovies);
                setMovies(currentMovies);
            } catch (error) {
                console.log(" currentMovies ", error);
            }

        }

        loadMovies();
    }, []);




    if (movies === null)
        return null;

    return (
        <div>
            <Grid container spacing={2} direction="row">
                {/* map though all movies to display them each in their own grid and with their own info */}
                {movies.map((movie) => (

                    <Grid item xs={12} sm={6} md={4} className="grid-item">
                        <Card className="movie-card">
                            <CardContent className="movie-card-content">
                                <Typography variant="h5" component="div">
                                    {movie.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {movie.description}
                                </Typography>
                                <Typography variant="body2" >
                                    Rating: {movie.rating}
                                </Typography>
                            </CardContent>
                            <CardActions className="review-button">
                                <div>
                                    <Link className="nav-link" to="/editMovie" state={{ movie: movie }}>
                                        <Button>Edit Details</Button>
                                    </Link>
                                </div>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}

            </Grid>
            <div className='add-container'>
                <Link className='add-container' to="/addMovie">
                    <Button variant="contained">Add Movie</Button>
                </Link>
            </div>
        </div>

    );
}

export default MovieList;
