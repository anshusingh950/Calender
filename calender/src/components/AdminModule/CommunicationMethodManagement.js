import React, { useState, useEffect } from 'react';
import { fetchCommunicationMethods } from '../../Services/apiService';

const CommunicationMethodManagement = () => {
  const [methods, setMethods] = useState([]);
  const [newMethod, setNewMethod] = useState({
    name: '',
    description: '',
    sequence: 0,
    mandatory: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCommunicationMethods();
      setMethods(result.data);
    };
    fetchData();
  }, []);

  const handleAddMethod = async () => {
    // Call an API to add a new communication method
    // For this example, it's simply updating the local state
    setMethods([...methods, newMethod]);
    setNewMethod({ name: '', description: '', sequence: 0, mandatory: false });
  };

  return (
    <div>
      <h2>Communication Method Management</h2>
      <div>
        <h3>Add New Communication Method</h3>
        <input
          type="text"
          placeholder="Method Name"
          value={newMethod.name}
          onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newMethod.description}
          onChange={(e) => setNewMethod({ ...newMethod, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Sequence"
          value={newMethod.sequence}
          onChange={(e) => setNewMethod({ ...newMethod, sequence: e.target.value })}
        />
        <label>
          Mandatory:
          <input
            type="checkbox"
            checked={newMethod.mandatory}
            onChange={(e) => setNewMethod({ ...newMethod, mandatory: e.target.checked })}
          />
        </label>
        <button onClick={handleAddMethod}>Add Communication Method</button>
      </div>
      <div>
        <h3>Existing Communication Methods</h3>
        {methods.map((method) => (
          <div key={method._id}>
            <h4>{method.name}</h4>
            <p>{method.description}</p>
            <p>Sequence: {method.sequence}</p>
            <p>Mandatory: {method.mandatory ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunicationMethodManagement;
