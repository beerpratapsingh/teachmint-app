import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';
import UserDirectory from './components/UserDirectory/UserDirectory';
import UserProfile from './components/UserProfile/UserProfile';
import * as api from './services/api';

import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  // const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await api.fetchUsers();
      setUsers(usersData);

      // const fetchPostData  = await api.fetchUserPosts();
      // console.log('Beer', fetchPostData);
      // setPost(fetchPostData);
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
            <UserDirectory users={users} /*post={post}*/ onUserClick={handleUserClick} />
          </Route>
          <Route path="/user/:userId">
            <UserProfile user={selectedUser} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

