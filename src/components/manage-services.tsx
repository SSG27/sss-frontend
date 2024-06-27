"use client";

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/Manage.module.css';

const ManageServicesPage = () => {
  const [services, setServices] = useState<{ id: string, name: string, monthlyFee: string }[]>([]);
  const [newService, setNewService] = useState({ id: '', name: '', monthlyFee: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const apiUrl = process.env.API_URL ?? 'localhost:8000';

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const response = await fetch(`http://api.sanju.netbuildertraining.com/services`);
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

    const response = await fetch(`http://api.sanju.netbuildertraining.com/services/newService`, {
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
    setSuccess(`Service with name ${newService.name} successfully created!`);
    setTimeout(() => setSuccess(''), 5000); // Clear success message after 5 seconds
  };

  const deleteService = async (id: string) => {
    const response = await fetch(`http://api.sanju.netbuildertraining.com/services/${id}`, {
      method: 'DELETE',
    });

    if (response.status >= 200 && response.status < 300) { // Check for any successful status code
      const deletedService = services.find(service => service.id === id);
      setServices(services.filter(service => service.id !== id)); // Update the state directly
      setDeleteMessage(`Service with name ${deletedService?.name} successfully deleted!`);
      setTimeout(() => setDeleteMessage(''), 5000); // Clear delete message after 5 seconds
    } else {
      setError('Error deleting service');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Manage Streaming Services</h1>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      {deleteMessage && <p className={styles.deleteMessage}>{deleteMessage}</p>}
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
      <ul className={styles.list}>
        <li className={styles.listHeader}>
          <span>ID</span>
          <span>Name</span>
          <span>Monthly Fee</span>
          <span>Actions</span>
        </li>
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
