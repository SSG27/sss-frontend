"use client";

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/Manage.module.css';

const ManageServicesPage = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ id: '', name: '', monthlyFee: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const response = await fetch('http://localhost:8000/services');
    const data = await response.json();
    setServices(data);
  };

  const validateService = () => {
    const { id, name, monthlyFee } = newService;
    if (!id && !name && !monthlyFee) {
      setError('All fields (id, name, monthly fee) are required.');
      return false;
    }
    if (!id && !name) {
      setError('Both id and name are required.');
      return false;
    }
    if (!id) {
      setError('id is required.');
      return false;
    }
    if (!name) {
      setError('name is required.');
      return false;
    }
    if (!/^\d+$/.test(id)) {
      setError('id must be a single integer with no spaces or other characters.');
      return false;
    }
    if (monthlyFee && !/^[\d.,£$€¥₹]+$/.test(monthlyFee)) {
      setError('monthlyFee must only contain numbers, dots, and currency symbols.');
      return false;
    }
    setError('');
    return true;
  };

  const addService = async () => {
    if (!validateService()) {
      return;
    }

    const response = await fetch('http://localhost:8000/services/newService', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newService),
    });

    const data = await response.json();
    if (response.status !== 201) {
      setError(data.message || 'Error adding service');
      return;
    }

    setNewService({ id: '', name: '', monthlyFee: '' });
    fetchServices();
  };

  const deleteService = async (id: string) => {
    await fetch(`http://localhost:8000/services/${id}`, {
      method: 'DELETE',
    });
    fetchServices();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Manage Streaming Services</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="ID"
          value={newService.id}
          onChange={(e) => setNewService({ ...newService, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Monthly Fee"
          value={newService.monthlyFee}
          onChange={(e) => setNewService({ ...newService, monthlyFee: e.target.value })}
        />
        <button className={styles.submitButton} onClick={addService}>Add Service</button>
      </div>
      <ul>
        {services.map((service: { id: string, name: string, monthlyFee: string }) => (
          <li key={service.id} className={styles.serviceItem}>
            <span>{service.id}</span>
            <span>{service.name}</span>
            <span>{service.monthlyFee}</span>
            <button onClick={() => deleteService(service.id)} className={styles.deleteButton}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageServicesPage;
