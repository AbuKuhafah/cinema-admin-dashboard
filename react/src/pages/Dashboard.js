import React from "react";
import Users from "../fragments/Users";
import Reviews from "../fragments/Reviews";
import { UserProvider, useUserContext } from '../contexts/UserContext';
import { ReviewProvider } from '../contexts/ReviewContext';
import { MovieProvider } from '../contexts/MovieContext';
import './dashboard.css'
import Analytics from "../fragments/Analytics";
import Views from "../fragments/Views";
import NumberReviews from "../fragments/NumberReviews";
import Reservation from "../fragments/Reservations";
import { SessionProvider } from "../contexts/SessionContext";

export default function Dashboard() {
    return (

        <div className="dashboard">
            <div className="dashboard-navigation">
                <div className="user-section">
                    <UserProvider>
                        <Users></Users>
                    </UserProvider>
                </div>
                <div className="review-section">
                    <ReviewProvider>
                        <Reviews></Reviews>
                    </ReviewProvider>
                </div>
                <div className="dashboard-content">

                    <Analytics />

                </div>
            </div>


        </div>

    )
}