import React from 'react';
import UserItem from './UserItem';
import './UserList.css';

const UserList = (props) => {
  console.log(props, "User")
  if (props.items.length === 0) {
    return (
      <div className='center'>
        <h2>No users Found.</h2>
      </div>
    );
  }
  return <>
    <ul className="user-lists">
      {props.items.map(user => (
        <UserItem key={user._id}
          id={user.id}
          image={user.useravatar}
          name={user.username}
          placeCount={user.places ? user.places.length : 0} />
      ))}
    </ul>
  </>
}

export default UserList;