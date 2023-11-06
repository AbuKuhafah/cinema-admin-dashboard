import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getReviews } from '../data/repository';
import { useMovieContext } from '../contexts/MovieContext';
import { useReviewContext } from '../contexts/ReviewContext';

const NumberReviews = () => {
  const { state, dispatch } = useMovieContext();
  useEffect(() => {
    loadReviewsWithReviewCount();
  }, []);

  const loadReviewsWithReviewCount = async () => {
    // Get reviews data from your db
    const reviews = await getReviews();

    // store the count of reviews for each movie
    const reviewCounts = {};

    // Calculate the number of reviews for each movie title
    reviews.forEach(review => {
      const movieTitle = review.title;
      reviewCounts[movieTitle] = (reviewCounts[movieTitle] || 0) + 1;
    });

    // Convert into an array for use in the BarChart
    const moviesWithReviewCount = Object.keys(reviewCounts).map(title => ({
      title,
      reviews: reviewCounts[title],
    }));

    dispatch({ type: 'SET_MOVIES', payload: moviesWithReviewCount });
  };

  return (
    <div>
      <div className="chart-title">
        <h2>Reviews per Movies</h2>
      </div>
      <div>
        {/* display as barchart */}
        <BarChart width={800} height={400} data={state.movies}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="reviews" fill="#a2d2ff" />
        </BarChart>
      </div>
    </div>
  );
};

export default NumberReviews;
