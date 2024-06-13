import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarItem from './CarItem';
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/cars/')
      .then(response => setCars(response.data))
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  return (
    <div className="car-list">
      {cars.map(car => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
