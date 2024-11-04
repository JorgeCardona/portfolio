import React, { useState, useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';

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

    const formattedDateUTC = timeUTC.toUTCString().replace(' GMT', ' UTC'); // Full UTC date and time without "GMT"
    const formattedDateUTC5 = timeUTC5.toUTCString().replace(' GMT', ' UTC-5'); // Full UTC-5 date and time without "GMT"

    return (
        <div style={{ fontSize: '2em', color: 'white', margin: '20px' }}>
            <div>
                <ReactCountryFlag 
                    countryCode="CO" 
                    svg 
                    style={{ width: '2em', height: '2em', marginRight: '10px' }} // Added margin for spacing
                />
                {formattedDateUTC5} 
                <ReactCountryFlag 
                    countryCode="GB" 
                    svg 
                    style={{ width: '2em', height: '2em', marginLeft: '10px', marginRight: '10px' }} // Added margin for spacing
                />
                {formattedDateUTC}
            </div>
        </div>
    );
}

export default DigitalClock;
