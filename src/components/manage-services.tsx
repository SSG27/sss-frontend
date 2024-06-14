"use client";

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/Manage.module.css';

const ManageServicesPage = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ id: '', name: '', monthlyFee: '' });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const response = await fetch('http://localhost:8000/services');
    const data = await response.json();
    setServices(data);
  };

  const addService = async () => {
    await fetch('http://localhost:8000/services/newService', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newService),
    });
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
        <button onClick={addService} className={styles.submitButton}>Add Service</button>
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
