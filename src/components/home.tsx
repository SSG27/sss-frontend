"use client";

import React, { useState } from 'react';
import AdSenseAd from '@/components/AdSenseAd'; 
import styles from '@/styles/Home.module.css';

const IndexPage = () => {
  const [countryCode, setCountryCode] = useState('');
  const [services, setServices] = useState<{ name: string, monthlyFee: number }[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const apiUrl = process.env.API_URL ?? 'localhost:8000';

  const fetchServices = async () => {
    if (!countryCode) {
      setError('Please enter a country code.');
      return;
    }

    try {
      const response = await fetch(`http://api.sanju.netbuildertraining.com/services/code/${countryCode}`);

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
      <AdSenseAd slot="1122334455" style={{ width: '100%', height: '90px' }} /> {/* Horizontal Ad before heading */}
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
      <ul className={styles.list}>
        <li className={styles.listHeader}>
          <span>Service Name</span>
          <span>Monthly Fee</span>
        </li>
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
