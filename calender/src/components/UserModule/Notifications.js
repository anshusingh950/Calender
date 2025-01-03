import React, { useEffect, useState } from 'react';
import { fetchOverdueCommunications, fetchDueCommunications } from '../Services/apiService';

const Notifications = () => {
  const [overdueCommunications, setOverdueCommunications] = useState([]);
  const [dueTodayCommunications, setDueTodayCommunications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const overdueRes = await fetchOverdueCommunications();
      setOverdueCommunications(overdueRes.data);
      const dueTodayRes = await fetchDueCommunications();
      setDueTodayCommunications(dueTodayRes.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <div>
        <h3>Overdue Communications</h3>
        {overdueCommunications.map((task) => (
          <div key={task._id}>
            <p>{task.companyName} - {task.communicationType}</p>
          </div>
        ))}
      </div>
      <div>
        <h3>Communications Due Today</h3>
        {dueTodayCommunications.map((task) => (
          <div key={task._id}>
            <p>{task.companyName} - {task.communicationType}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
