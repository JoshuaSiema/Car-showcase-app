import React from 'react';
import './CarItem.css';
import CarBooking from './CarBookings';

const CarItem = ({ car }) => {
  return (
    <div className="car-item">
      <h2>{car.brand} {car.model}</h2>
      <p>Available: {car.available ? 'Yes' : 'No'}</p>
      <CarBooking carId={car.id} available={car.available} />
    </div>
  );
};

export default CarItem;
