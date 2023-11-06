import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getMovies, getReviews } from "../data/repository";
import { useMovieContext } from '../contexts/MovieContext';
import { useState, useEffect, useContext } from "react";
import Views from './Views';
import NumberReviews from './NumberReviews';
import { MovieProvider } from '../contexts/MovieContext';
import { SessionProvider } from '../contexts/SessionContext';
import Reservation from './Reservations';
import './analytics.css'

const Analytics = () => {

    return (
        <div className='analytics-container'>
            <h1 className="display-4">Analytics</h1>

            {/* Render the Views component */}
            <div className='graph'>
                <MovieProvider>
                    <Views></Views>
                </MovieProvider>
            </div>
            {/* Render the Views component */}
            <div className='graph'>
                <MovieProvider>
                    <NumberReviews></NumberReviews>
                </MovieProvider>
            </div>
            {/* Render the Reservation component */}
            <div className='graph'>
                <SessionProvider>
                    <Reservation></Reservation>
                </SessionProvider>
            </div>


        </div>
    );
};

export default Analytics;