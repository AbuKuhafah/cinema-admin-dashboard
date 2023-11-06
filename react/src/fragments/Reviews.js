import React from "react"
import { Card, CardContent, Typography, Rating, CardActions } from "@mui/material";
import Button from '@mui/material/Button';
import { getReviews, updateReview } from "../data/repository";
import { useState, useEffect, useContext } from "react";
import { useReviewContext } from '../contexts/ReviewContext';
import MessageContext from "../contexts/MessageContext";

export default function Reviews() {
    const { state, dispatch } = useReviewContext();

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        const currentReviews = await getReviews();
        dispatch({ type: 'SET_REVIEWS', payload: currentReviews });
    };

    async function handleDelete(post_id) {
        console.log("delete: ", post_id);
        await updateReview({ post_id });
        await loadReviews();
        dispatch({ type: 'SET_MESSAGE', payload: <><strong>{post_id}</strong> has been deleted successfully.</> });
    }


    if (state.reviews === null)
        return null;

    return (
        <div className='review'>
            <h1 className="display-4">Reviews</h1>

            {state.reviews.map(review =>
                <Card variant="outlined" sx={{ minWidth: 345 }} key={review.post_id}
                >
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div">
                            {review.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {review.email}
                        </Typography>
                        <div dangerouslySetInnerHTML={{ __html: review.review }} />
                        {/* <Typography variant="body2" color="text.secondary" component="legend">Rating</Typography> */}
                        <Rating name="read-only" value={review.rating} readOnly />

                        <CardActions>
                            <div>
                                {/* {console.log("review.post_id: ", review.post_id)} */}
                                <Button onClick={() => handleDelete(review.post_id)}>Delete</Button>
                            </div>
                        </CardActions>

                    </CardContent>

                </Card>
            )}
        </div>
    )
}