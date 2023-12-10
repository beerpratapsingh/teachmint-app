import React, { useState, useEffect } from 'react';
import './index.css';

const PostModal = ({ post, onClose }) => {
  const [isOutsideClick, setIsOutsideClick] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.modal-content')) {
        setIsOutsideClick(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOutsideClick) {
      onClose();
    }
  }, [isOutsideClick, onClose]);

  return (
    <div className="post-modal">
      <div className="modal-content">
        <h2 className='modal-title'>Post Content</h2>
        <h3 className='post-title'>{post?.title}</h3>
        <p className='post-txt'>{post?.body}</p>
        <button className='close-btn' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PostModal;
