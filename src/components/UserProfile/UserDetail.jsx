import React from 'react';

const UserDetail = ({ user }) => {
  const addressHtml = `
    <div>
      <strong>City:</strong> ${user.address.city}
    </div>
    <div>
      <strong>Street:</strong> ${user.address.street}
    </div>
    <div>
      <strong>Suite:</strong> ${user.address.suite}
    </div>
    <div>
      <strong>Zipcode:</strong> ${user.address.zipcode}
    </div>
    <div>
      <strong>Geo Location:</strong> 
      <span>Latitude: ${user.address.geo.lat}</span>
      <span>Longitude: ${user.address.geo.lng}</span>
    </div>
  `;

  return (
    <div className="user-details">
      <div className='user-detail'>
          <div className='user-name'>
            {user.name}
          </div>
          <div className='user-username'>
            <span>{user.username}</span> <strong> | </strong> <span>{user.company.catchPhrase}</span>
          </div>
      </div>
      <div className='user-address'>
        <div dangerouslySetInnerHTML={{ __html: addressHtml }} />
        {user.email} <strong> | </strong> {user.phone}
      </div>
  </div>
  )
};
export default UserDetail;
