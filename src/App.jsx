import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';
import UserDirectory from './components/UserDirectory/UserDirectory';
import UserProfile from './components/UserProfile/UserProfile';
import * as api from './services/api';

import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await api.fetchUsers();
      setUsers(usersData);
    };
    fetchData();
  }, []);

  const handleUserClick = (id) => {
    setSelectedUserId(id);
  };

  const selectedUser = users.find((user) => user.id === selectedUserId);

  return (
    <div className='container'>
      <Router>
        <Switch>
          <Route exact path="/">
            <UserDirectory users={users} onUserClick={handleUserClick} />
          </Route>
          <Route path="/user/:userId">
            {/* {selectedUser && <UserProfile user={selectedUser} />} */}
            <UserProfile user={selectedUser} />
          </Route>
          {/* <Route path="/user/:userId">
            {selectedUserId && selectedUser ? (
              <UserProfile user={selectedUser} />
            ) : (
              <Redirect to="/" /> // Redirect to home if user is not found
            )}
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;

