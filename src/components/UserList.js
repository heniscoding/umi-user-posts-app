import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../services/api';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-list">
      {users.map(user => (
        <Link to={`/user/${user.id}`} key={user.id} className="user-card">
          <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} />
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </Link>
      ))}
    </div>
  );
};

export default UserList;