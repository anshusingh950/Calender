import React, { useState, useEffect } from 'react';
import { fetchCompanies, addCompany, updateCompany, deleteCompany } from "../Services/apiService"

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: '',
    location: '',
    linkedInProfile: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    communicationPeriodicity: 0,
  });

  const [editingCompany, setEditingCompany] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCompaniesData();
      setCompanies(result.data);
    };
  }, []);

  const handleAddCompany = async () => {
    const companyData = {
      ...newCompany,
      emails: newCompany.emails.split(','),
      phoneNumbers: newCompany.phoneNumbers.split(','),
    };

    await addCompany(companyData);
    setNewCompany({
      name: '',
      location: '',
      linkedInProfile: '',
      emails: '',
      phoneNumbers: '',
      comments: '',
      communicationPeriodicity: 0,
    });
    fetchCompaniesData();
  };

  const handleEditCompany = async (companyId) => {
    const companyToEdit = companies.find((company) => company._id === companyId);
    setEditingCompany(companyToEdit);
  };

  const handleUpdateCompany = async () => {
    const updatedCompany = {
      ...editingCompany,
      emails: editingCompany.emails.split(','),
      phoneNumbers: editingCompany.phoneNumbers.split(','),
    };
    await updateCompany(updatedCompany);
    setEditingCompany(null);
    fetchCompaniesData();
  };

  const handleDeleteCompany = async (companyId) => {
    await deleteCompany(companyId);
    fetchCompaniesData();
  };

  const fetchCompaniesData = async () => {
    let dt = await fetch("https://calender-m4nc.onrender.com/api/companies", {
      method: "GET",
      headers: {
          "Content-Type": 'application/json'
      }
  });
  let pt = await dt.json();
    console.log(pt.data)
    setCompanies(pt.data);
  };

  return (
    <div>
      <h2>Company Management</h2>

      {/* Add Company Form */}
      <h3>Add New Company</h3>
      <input
        type="text"
        placeholder="Company Name"
        value={newCompany.name}
        onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        value={newCompany.location}
        onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
      />
      <input
        type="text"
        placeholder="LinkedIn Profile"
        value={newCompany.linkedInProfile}
        onChange={(e) => setNewCompany({ ...newCompany, linkedInProfile: e.target.value })}
      />
      <input
        type="text"
        placeholder="Emails (comma separated)"
        value={newCompany.emails}
        onChange={(e) => setNewCompany({ ...newCompany, emails: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone Numbers (comma separated)"
        value={newCompany.phoneNumbers}
        onChange={(e) => setNewCompany({ ...newCompany, phoneNumbers: e.target.value })}
      />
      <textarea
        placeholder="Comments"
        value={newCompany.comments}
        onChange={(e) => setNewCompany({ ...newCompany, comments: e.target.value })}
      />
      <input
        type="number"
        placeholder="Communication Periodicity (weeks)"
        value={newCompany.communicationPeriodicity}
        onChange={(e) => setNewCompany({ ...newCompany, communicationPeriodicity: e.target.value })}
      />
      <button onClick={handleAddCompany}>Add Company</button>

      <h3>Existing Companies</h3>
      {companies.map((company) => (
        <div key={company.communicationPeriodicity} style={{ marginBottom: '20px' }}>
          <h4>{company.name}</h4>
          <p>Location: {company.location}</p>
          <p>LinkedIn: <a href={company.linkedInProfile} target="_blank" rel="noopener noreferrer">{company.linkedInProfile}</a></p>
          <p>Emails: {company.emails.join(', ')}</p>
          <p>Phone Numbers: {company.phoneNumbers.join(', ')}</p>
          <p>Comments: {company.comments}</p>
          <p>Communication Periodicity: {company.communicationPeriodicity} weeks</p>
          <button onClick={() => handleEditCompany(company._id)}>Edit</button>
          <button onClick={() => handleDeleteCompany(company._id)}>Delete</button>
        </div>
      ))}

      {/* Edit Company Modal */}
      {editingCompany && (
        <div style={{ border: '1px solid #ccc', padding: '20px' }}>
          <h3>Edit Company - {editingCompany.name}</h3>
          <input
            type="text"
            value={editingCompany.name}
            onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
          />
          <input
            type="text"
            value={editingCompany.location}
            onChange={(e) => setEditingCompany({ ...editingCompany, location: e.target.value })}
          />
          <input
            type="text"
            value={editingCompany.linkedInProfile}
            onChange={(e) => setEditingCompany({ ...editingCompany, linkedInProfile: e.target.value })}
          />
          <input
            type="text"
            value={editingCompany.emails.join(', ')}
            onChange={(e) => setEditingCompany({ ...editingCompany, emails: e.target.value.split(',') })}
          />
          <input
            type="text"
            value={editingCompany.phoneNumbers.join(', ')}
            onChange={(e) => setEditingCompany({ ...editingCompany, phoneNumbers: e.target.value.split(',') })}
          />
          <textarea
            value={editingCompany.comments}
            onChange={(e) => setEditingCompany({ ...editingCompany, comments: e.target.value })}
          />
          <input
            type="number"
            value={editingCompany.communicationPeriodicity}
            onChange={(e) => setEditingCompany({ ...editingCompany, communicationPeriodicity: e.target.value })}
          />
          <button onClick={handleUpdateCompany}>Update Company</button>
          <button onClick={() => setEditingCompany(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;
