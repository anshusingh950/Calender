import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:5000/api', // Flask backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
}); 

// Fetch companies
export const fetchCompanies = () => apiService.get('/companies');

// Fetch communication methods
export const fetchCommunicationMethods = () => apiService.get('/communication-methods');

// Add a new company
export const addCompany = (companyData) => apiService.post('/companies', companyData);

// Update a company
export const updateCompany = (companyId, companyData) => apiService.put(`/companies/${companyId}`, companyData);

// Delete a company
export const deleteCompany = (companyId) => apiService.delete(`/companies/${companyId}`);

// Log communication
export const logCommunication = (communicationData) => apiService.post('/communications', communicationData);

// Fetch overdue tasks
export const fetchOverdueCommunications = () => apiService.get('/communications/overdue');

// Fetch due tasks
export const fetchDueCommunications = () => apiService.get('/communications/due');
 