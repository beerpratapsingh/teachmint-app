import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Clock from './Clock';
import UserDetail from './UserDetail';
import UserPosts from './UserPosts';
import * as api from '../../services/api';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState('');
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
    };

    const fetchTimezones = async () => {
      try {
        const response = await fetch('http://worldtimeapi.org/api/timezone');
        const data = await response.json();
        setTimezones(data);
        setSelectedTimezone(data[0]); // Set the default timezone
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

        // Update this part to parse the time correctly
        if (data && (data.utc_datetime || data.datetime) && data.utc_offset) {
          const utcDatetime = new Date(data.utc_datetime || data.datetime);
          const offset = data.utc_offset;
          const offsetSign = offset.charAt(0) === '+' ? 1 : -1;
          const offsetHours = parseInt(offset.substring(1, 3), 10);
          const offsetMinutes = parseInt(offset.substring(4, 6), 10);

          utcDatetime.setHours(utcDatetime.getHours() + offsetSign * offsetHours);
          utcDatetime.setMinutes(utcDatetime.getMinutes() + offsetSign * offsetMinutes);

          setCurrentTime(utcDatetime);
        } else {
          console.error('Invalid response format:');
          throw new Error('Invalid response format');
        }

        // setCurrentTime(new Date(data.utc_datetime));
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    fetchTime();
  }, [selectedTimezone]);

  const handleTimezoneChange = (e) => {
    setSelectedTimezone(e.target.value);
    setClockKey((prevKey) => prevKey + 1);
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
            <Clock key={clockKey} currentTime={currentTime} selectedTimezone={selectedTimezone} />
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
