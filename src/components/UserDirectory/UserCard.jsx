import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../services/api';

const UserCard = ({ user, onUserClick }) => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
      const postData = async () => {
        const fetchPostData  = await api.fetchUserPosts();
        setPostData(fetchPostData);
      }
      postData();
  }, []);

  const postCount = postData.filter((post) => post.userId === user.id);
  const handleUserClick = () => {
    if (onUserClick) onUserClick(user.id);
  };
  return(
    <>
      <Link to={`/user/${user?.id}`} className="user-card" onClick={handleUserClick}>
        <div className="user-info">
          <div className="user-name"><strong>Name: </strong> {user?.name}</div>
          <div className="post-count"><strong>Posts: </strong>{postCount?.length}</div>
        </div>
      </Link>
    </>
  )
};
export default UserCard;
