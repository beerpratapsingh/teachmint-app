import React, { useState, useEffect } from 'react';
import { useParams, useHistory  } from 'react-router-dom';
import Clock from './Clock';
import UserDetail from './UserDetail';
import UserPosts from './UserPosts';
import * as api from '../../services/api';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState('');//Indian/Chagos
  const [clockKey, setClockKey] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await api.fetchUserDetails(userId);
      setUser(userData);
    };
    const fetchPostData = async () => {
      const userPostsData = await api.fetchUserPosts(userId);
      setPosts(userPostsData);
    }

    const fetchTimezones = async () => {
      try {
        const response = await fetch('http://worldtimeapi.org/api/timezone');
        const data = await response.json();
        console.log('09090909', data);
        setTimezones(data);
        //setSelectedTimezone(data[0]); // Set the default timezone
      } catch (error) {
        console.error('Error fetching timezones:', error);
      }
    };

    fetchUserData();
    fetchPostData();
    fetchTimezones();
  }, [userId]);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch(`http://worldtimeapi.org/api/timezone/${selectedTimezone}`);
        const data = await response.json();
        console.log('selectedTimeZones', data);
        setCurrentTime(new Date(data.utc_datetime));
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    fetchTime();
  }, [selectedTimezone]);

  const handleTimezoneChange = (e) => {
    const selected = e.target.value;
    setSelectedTimezone(selected);
    setClockKey((prevKey) => prevKey + 1); // Change the key to force Clock component remount
    // console.log('inner selectedTimezone', selectedTimezone);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className="user-profile">
      {user && (
        <>
          <div className="profile-header">
            <button className='back-btn' onClick={handleGoBack}>Go Back</button>
            {/* <h3>{user.name}'s Profile</h3> */}
            <div>
              <label htmlFor="timezoneSelector">Select Timezone: </label>
              <select
                id="timezoneSelector"
                value={selectedTimezone}
                onChange={handleTimezoneChange}
              >
                {timezones.map((timezone) => (
                  <option key={timezone} value={timezone}>
                    {timezone}
                  </option>
                ))}
              </select>
            </div>
            {/* <Clock timezones={user?.timezones || 'UTC'} /> */}
            <Clock timezones={currentTime} />
          </div>
          <h2>Profile Page</h2>
          <UserDetail user={user} />
          <UserPosts posts={posts} />
        </>
      )}
    </div>
  );
};

export default UserProfile;
