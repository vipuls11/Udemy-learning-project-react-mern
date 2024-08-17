import React from 'react';
import './UserList'
import UserItem from './UserItem';

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
        <UserItem key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places} />
      ))}
    </ul>
  </>
}

export default UserList;