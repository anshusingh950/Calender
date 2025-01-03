import React, { useState } from 'react';
import { logCommunication } from '../Services/apiService';

const CommunicationAction = ({ company, onActionComplete }) => {
  const [communicationType, setCommunicationType] = useState('');
  const [communicationDate, setCommunicationDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async () => {
    const communicationData = {
      companyId: company._id,
      communicationType,
      communicationDate,
      notes,
    };

    await logCommunication(communicationData);
    onActionComplete(); // Notify parent to refresh the data
  };

  return (
    <div>
      <h3>Log Communication for {company.name}</h3>
      <select
        value={communicationType}
        onChange={(e) => setCommunicationType(e.target.value)}
      >
        <option value="">Select Communication Type</option>
        <option value="LinkedIn Post">LinkedIn Post</option>
        <option value="LinkedIn Message">LinkedIn Message</option>
        <option value="Email">Email</option>
        <option value="Phone Call">Phone Call</option>
      </select>
      <input
        type="date"
        value={communicationDate}
        onChange={(e) => setCommunicationDate(e.target.value)}
      />
      <textarea
        placeholder="Add Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button onClick={handleSubmit}>Log Communication</button>
    </div>
  );
};

export default CommunicationAction;
