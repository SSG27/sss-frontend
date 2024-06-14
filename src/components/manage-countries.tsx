"use client";

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/Manage.module.css';

const ManageCountriesPage = () => {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState({ code: '', country: '', services: '' });

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('http://localhost:8000/codes');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const addCountry = async () => {
    if (!newCountry.code || !newCountry.country || !newCountry.services) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newCountry,
          services: newCountry.services.split(',').map((service) => Number(service.trim())),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error adding country:', errorData);
        alert(`Error adding country: ${errorData.message || response.statusText}`);
        return;
      }

      setNewCountry({ code: '', country: '', services: '' });
      fetchCountries();
    } catch (error) {
      console.error('Error adding country:', error);
      alert('An error occurred while adding the country.');
    }
  };

  const deleteCountry = async (code: string) => {
    try {
      const response = await fetch(`http://localhost:8000/codes/${code}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error deleting country:', errorData);
        alert(`Error deleting country: ${errorData.message || response.statusText}`);
        return;
      }

      fetchCountries();
    } catch (error) {
      console.error('Error deleting country:', error);
      alert('An error occurred while deleting the country.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Manage Countries</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Code"
          value={newCountry.code}
          onChange={(e) => setNewCountry({ ...newCountry, code: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country"
          value={newCountry.country}
          onChange={(e) => setNewCountry({ ...newCountry, country: e.target.value })}
        />
        <input
          type="text"
          placeholder="Services IDs"
          value={newCountry.services}
          onChange={(e) => setNewCountry({ ...newCountry, services: e.target.value })}
        />
        <button onClick={addCountry} className={styles.submitButton}>Add Country</button>
      </div>
      <ul>
        {countries.map((country: { code: string, country: string, services: number[] }) => (
          <li key={country.code} className={styles.countryItem}>
            <span>{country.code}</span>
            <span>{country.country}</span>
            <span>Services: {country.services.join(', ')}</span>
            <button onClick={() => deleteCountry(country.code)} className={styles.deleteButton}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCountriesPage;
