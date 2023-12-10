import React, { useState } from 'react';
import PostModal from '../popup/PostModal';

const UserPosts = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => setSelectedPost(post);
  const handleCloseModal = () => setSelectedPost(null);
  return(
    <>
      <div className="user-posts">
        {posts.map((post) => (
          <div key={post.id} className="post-card" onClick={() => handlePostClick(post)}>
            <div className="post-title">{post.title}</div>
            <div className="post-content">{post.body}</div>
          </div>
        ))}
      </div>
      {selectedPost && <PostModal post={selectedPost} onClose={handleCloseModal} />}
    </>
  );
}
export default UserPosts;

