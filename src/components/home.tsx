"use client";

import React, { useState } from 'react';

const IndexPage = () => {
  const [countryCode, setCountryCode] = useState('');
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    if (!countryCode) {
      alert('Please enter a country code.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/services/code/${countryCode}`);

      if (response.status === 404) {
        alert('Invalid country code. Please enter a valid country code.');
        return;
      }

      const data = await response.json();

      if (response.status !== 200) {
        alert('Error fetching services.');
        return;
      }

      setServices(data);
    } catch (error) {
      alert('An error occurred while fetching services.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Search Streaming Services by Country Code</h1>
      <input
        type="text"
        placeholder="Enter country code"
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
      />
      <button onClick={fetchServices}>Search</button>
      <ul>
        {services.map((service: { name: string, monthlyFee: number }, index: number) => (
          <li key={index}>
            {service.name} - {service.monthlyFee}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
