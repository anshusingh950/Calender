import React, { useState, useEffect } from 'react';
import { fetchCompanies, fetchOverdueCommunications, fetchDueCommunications } from '../Services/apiService';

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [dueToday, setDueToday] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const companiesRes = await fetchCompanies();
      setCompanies(companiesRes.data);
      const overdueRes = await fetchOverdueCommunications();
      setOverdue(overdueRes.data);
      const dueTodayRes = await fetchDueCommunications();
      setDueToday(dueTodayRes.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Overdue Communications</h3>
        {overdue.map((task) => (
          <div key={task._id}>
            <p>{task.companyName} - {task.communicationType}</p>
          </div>
        ))}
      </div>
      <div>
        <h3>Communications Due Today</h3>
        {dueToday.map((task) => (
          <div key={task._id}>
            <p>{task.companyName} - {task.communicationType}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
