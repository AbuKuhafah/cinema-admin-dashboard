import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getUserSessions } from '../data/repository';
import { useSessionContext } from '../contexts/SessionContext';

const Reservation = () => {
    const { state, dispatch } = useSessionContext();
    const [ticketData, setTicketData] = useState([]);

    useEffect(() => {
        loadTicketBookings();
    }, []);

    const loadTicketBookings = async () => {
        try {
            const ticketBookings = await getUserSessions();

            // Aggregate the data by date and calculate the total tickets booked for each day
            const aggregatedData = aggregateDataByDate(ticketBookings);

            // Set the aggregated data
            setTicketData(aggregatedData);
        } catch (error) {
            console.error("Error loading reservations:", error);
        }
    };

    // Function to aggregate data by date and calculate total tickets booked each day
    const aggregateDataByDate = (data) => {
        const aggregatedData = {};

        data.forEach((session) => {
            const date = new Date(session.booked_in).toDateString();
            if (aggregatedData[date]) {
                aggregatedData[date] += session.tickets;
            } else {
                aggregatedData[date] = session.tickets;
            }
        });

        // Convert the adata into an array for use in the LineChart
        return Object.keys(aggregatedData).map((date) => ({
            date,
            totalTickets: aggregatedData[date],
        }));
    };

    return (
        <div>
            <div className="chart-title">
                <h2>Tickets per Day</h2>
            </div>
            {/* display as line graph */}
            <LineChart width={800} height={400} data={ticketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dataKey="totalTickets" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalTickets" stroke="#cdb4db" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    );
};

export default Reservation;
