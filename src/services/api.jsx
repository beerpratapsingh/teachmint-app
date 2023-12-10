import axios from 'axios';

export const fetchUsers = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const fetchUserPosts = async (userId) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user posts:', error);
  }
};

export const fetchUserDetails = async (userId) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
};

export const fetchTimezones = async (timezones) => {
  try {
    const response = await fetch(`http://worldtimeapi.org/api/timezone/${timezones}`);
    return response;
  } catch (error)  {
    console.log('Error fetching timezones', error);
  }
}