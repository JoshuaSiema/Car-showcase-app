import React, { useState } from 'react';
import axios from 'axios';
import './CarBooking.css';

const CarBooking = ({ carId, available }) => {
  const [bookingStatus, setBookingStatus] = useState('');

  const handleBooking = () => {
    axios.post('http://127.0.0.1:8000/bookings/', { car_id: carId })
      .then(response => {
        setBookingStatus('Car booked successfully!');
      })
      .catch(error => {
        setBookingStatus('Error booking car.');
        console.error('Error booking car:', error);
      });
  };

  return (
    <div className="car-booking">
      {available ? (
        <button onClick={handleBooking}>Book Car</button>
      ) : (
        <p>Car is not available</p>
      )}
      {bookingStatus && <p>{bookingStatus}</p>}
    </div>
  );
};

export default CarBooking;
