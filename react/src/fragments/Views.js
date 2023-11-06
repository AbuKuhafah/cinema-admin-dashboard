import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getMovies } from "../data/repository";
import { useMovieContext } from '../contexts/MovieContext';
import { useState, useEffect, useContext } from "react";

const Views = () => {
    const { state, dispatch } = useMovieContext();
    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        // get movie data from db
        const currentMovie = await getMovies();
        dispatch({ type: 'SET_MOVIES', payload: currentMovie });
        console.log("state.movies: " + currentMovie)
    };

    return (
        <div>
            <div className="chart-title">
                <h2>Views per Movies</h2>
            </div>
            {/* display as barcahrt */}
            <BarChart width={800} height={400} data={state.movies}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#ffafcc" />
            </BarChart>
        </div>
    );
};

export default Views;