"use client";

import React, { useState } from 'react';
import styles from '@/styles/Home.module.css';

const IndexPage = () => {
  const [countryCode, setCountryCode] = useState('');
  const [services, setServices] = useState<{ name: string, monthlyFee: number }[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchServices = async () => {
    if (!countryCode) {
      setError('Please enter a country code.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/services/code/${countryCode}`);

      if (response.status === 404) {
        setError('Invalid country code. Please enter a valid country code.');
        return;
      }

      const data = await response.json();

      if (response.status !== 200) {
        setError('Error fetching services.');
        return;
      }

      setServices(data);
      setError('');
      setSuccess('Services fetched successfully!');
      setTimeout(() => setSuccess(''), 5000); // Clear success message after 5 seconds
    } catch (error) {
      setError('An error occurred while fetching services.');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Search Streaming Services by Country Code</h1>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter country code"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        />
        <button onClick={fetchServices} className={styles.submitButton}>Search</button>
      </div>
      <ul>
        {services.map((service, index) => (
          <li key={index} className={styles.serviceItem}>
            <span>{service.name}</span>
            <span>{service.monthlyFee}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
