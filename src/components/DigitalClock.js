import React, { useState, useEffect } from 'react';

function DigitalClock() {
    const [timeUTC, setTimeUTC] = useState(new Date(Date.now())); // Start with current UTC time
    const [timeUTC5, setTimeUTC5] = useState(new Date(Date.now())); // Start with current UTC-5 time

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Update UTC time
            setTimeUTC(new Date(Date.now()));
            // Update UTC-5 time by subtracting 5 hours (5 * 60 * 60 * 1000 milliseconds)
            setTimeUTC5(new Date(Date.now() - 5 * 60 * 60 * 1000));
        }, 1000); // Update every second

        return () => clearInterval(intervalId); // Clear the interval on unmount
    }, []);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const formattedDateUTC = timeUTC.toUTCString('en-US', options).replace(' GMT', ' UTC'); // Full UTC date and time without "GMT"
    const formattedDateUTC5 = timeUTC5.toUTCString('en-US', options).replace(' GMT', ' UTC-5'); // Full UTC-5 date and time without "GMT"

    return (
        <div style={{ fontSize: '2em', color: 'white', margin: '20px' }}>
            <div>{formattedDateUTC5} - {formattedDateUTC}</div>
        </div>
    );
}

export default DigitalClock;
