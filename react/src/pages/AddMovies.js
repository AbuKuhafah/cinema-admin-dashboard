import React, { useState } from 'react';
import { TextField, Button, Container, Box, Rating } from '@mui/material';
import { createMovie } from '../data/repository';
const Buffer = require('buffer').Buffer;

function AddMovies() {
    const [movieData, setMovieData] = useState({
        title: '',
        rating: 0,
        description: '',
        image_path: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovieData({ ...movieData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
      
        const reader = new FileReader();
        reader.onload = () => {
            const imageBase64 = Buffer.from(reader.result).toString('base64');
            setMovieData({ ...movieData, image_path: imageBase64 });
        };
    
        reader.readAsArrayBuffer(file);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newMovie = { title: movieData.title, rating: parseInt(movieData.rating), description: movieData.description, image_path: movieData.image_path }
            console.log('New Movie:', newMovie);
            await createMovie(newMovie);
        } catch (error) {
            console.error('Error creating movie:', error);
        }
    };

    return (
        <Box
            sx={{ bgcolor: 'common.white', p: 3, boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}
        >
            <Container maxWidth="sm">
                <h2>Add a Movie</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        mb={5}
                        label="Title"
                        name="title"
                        variant="outlined"
                        value={movieData.title}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={movieData.description}
                        onChange={handleInputChange}
                    />
                    <Rating value={parseInt(movieData.rating)}
                        name="rating" size="large" onChange={handleInputChange} />
                    <br></br>
                    <input
                        type="file"
                        name="image_path"
                        onChange={handleImageChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Add Movie
                    </Button>
                </form>
            </Container>
        </Box>
    );
}

export default AddMovies;
