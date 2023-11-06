import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './editMovie.css';
import { Button, Rating, TextField } from "@mui/material";
import { updateMovie } from "../data/repository";
import { Link } from "react-router-dom";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

function EditMovie() {
    const location = useLocation()
    const movie = location.state?.movie;
    console.log("movie : " + movie);
    const navigate = useNavigate();

    const [fields, setFields] = useState({ title: movie.title, rating: movie.rating, description: movie.description });
    const [errorMessage, setErrorMessage] = useState(null);

    // Event handler for input field changes
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        // Copy the fields and update the changed field
        const temp = { ...fields };
        temp[name] = value;
        setFields(temp);
    }

    //check for validation and submit reviews 
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (fields.rating <= 0) {
            setErrorMessage("Rating cannot be 0");
            console.log("the errormessage is: ", errorMessage)
        } else if (fields.description.length >= 600) {
            setErrorMessage("description is too big");
            console.log("the errormessage is: ", errorMessage)
        }
        else {
            const updatedMovie = { title: movie.title, rating: parseInt(fields.rating), description: fields.description }

            await updateMovie(updatedMovie)
            navigate("/movieList");
            setErrorMessage(null);
        }


    }

    return (
        <div className="edit-movie-container">
            <h1>{movie.title}</h1>
            <form className="edit-movie-form" onSubmit={handleSubmit}>
                <Rating value={fields.rating} name="rating" size="large" onChange={handleInputChange} />
                <TextField
                    className="edit-movie-input"
                    name="description"
                    id="description"
                    variant="outlined"
                    label="Description"
                    value={fields.description}
                    multiline
                    rows={4}
                    onChange={handleInputChange}
                />
                <div className="buttons-container">
                    <Button className='cancel-button'>
                        <Link className="nav-link" to="/movieList">Cancel</Link>
                    </Button>
                    <Button className='update-button' type="submit">Update</Button>
                </div>
                {errorMessage !== null && <span className="error-message">{errorMessage}</span>}
            </form>
        </div>
    )
}

export default EditMovie