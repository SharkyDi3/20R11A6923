import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://104.211.219.98/train';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODc2Nzc3NDUsImNvbXBhbnlOYW1lIjoiU2VraGFyIEltcG9ydHMgYW5kIEV4cG9ydHMiLCJjbGllbnRJRCI6IjQwZDUzODkxLTc1NjYtNDgxZS1iNTc3LTkyNDhlMWU2ZmUzMCIsIm93bmVyTmFtZSI6IiIsIm93bmVyRW1haWwiOiIiLCJyb2xsTm8iOiIyMFIxMUE2OTIzIn0.dawzTllTLwxAhN9RvFFjn4pHt_aUBL0NZeTf1C64lAM"

const App = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get(`${API_URL}/trains`, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };

    fetchTrains();
  }, []);

  return (
    <div>
      <h1>All Trains Schedule</h1>
      <div>
        {trains.map((train) => (
          <div key={train.id}>
            <h2>Train #{train.id}</h2>
            <p>Departure: {train.departureTime}</p>
            <p>Delay: {train.delay} minutes</p>
            <p>Seats Availability: {train.seatsAvailability}</p>
            <p>Price (Sleeper): {train.prices.sleeper}</p>
            <p>Price (AC): {train.prices.ac}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
