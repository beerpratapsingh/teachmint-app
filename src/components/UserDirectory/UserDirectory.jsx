import React from 'react';
import UserCard from './UserCard';

const UserDirectory = ({ users, onUserClick }) => {
  return(
  <div className="user-directory">
    <h1 className='page-title'>Directory</h1>
    {users.map((user) => (
      <UserCard key={user.id} user={user} onUserClick={onUserClick} />
    ))}
  </div>
)};

export default UserDirectory;
