import React from 'react';
import UserList from '../components/UserList';


const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Vipul Vishwakrama',
            image: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            places: 3
        },
        {
            id: 'u2',
            name: 'Vipul Vishwakrama',
            image: 'https://wallpapercave.com/wp/wp3146782.jpg',
            places: 4
        }
    ]
    return <>
        <UserList items={USERS} />
    </>
}

export default Users;