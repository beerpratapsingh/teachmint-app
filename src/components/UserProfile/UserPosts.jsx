import React from 'react';

const UserPosts = ({ posts }) => {
  console.log('Beer post ', posts)
  return(
    <div className="user-posts">
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <div className="post-title">{post.title}</div>
          <div className="post-content">{post.body}</div>
        </div>
      ))}
    </div>
  );
}
export default UserPosts;

