import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user, onUserClick }) => {
  
  const handleUserClick = () => {
    if (onUserClick) onUserClick(user.id);
  };

  return(
  <Link to={`/user/${user?.id}`} className="user-card" onClick={handleUserClick}>
    <div className="user-info">
      <div className="user-name"><strong>Name: </strong> {user?.name}</div>
      <div className="post-count"><strong>Posts: </strong>{user?.posts?.length}</div>
    </div>
  </Link>
)};

export default UserCard;
