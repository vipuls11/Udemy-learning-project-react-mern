import React, { useEffect, useState } from 'react';
import UserList from '../components/UserList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElement/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner';


const Users = () => {
    // const USERS = [
    //     {
    //         id: 'u1',
    //         name: 'Rahul Vishwakrama',
    //         image: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    //         places: 3
    //     },
    //     {
    //         id: 'u2',
    //         name: 'Vipul Vishwakrama',
    //         image: 'https://wallpapercave.com/wp/wp3146782.jpg',
    //         places: 4
    //     }
    //     ,
    //     {
    //         id: 'u3',
    //         name: 'Vishal Vishwakrama',
    //         image: 'https://wallpapercave.com/wp/wp3146782.jpg',
    //         places: 6
    //     }
    // ]

    const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState([]);

    useEffect(()=>{
        const fetchUsers = async () =>{
            try{
                const responseData = await sendRequest(`${process.env.REACT_APP_API_AUTH_URI}`);
                // console.log(responseData.users, "vipul")
                setLoadedUsers(responseData.users)
            }catch(err){
                console.log("Something Failed to effect data")
            }
        }

        fetchUsers()
    },[sendRequest, setLoadedUsers])
    // console.log(loadedUsers, "Users")
    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        {
            isLoading && (
                <div className="center">
                    <LoadingSpinner/>
                </div>
            )
        }
       {!isLoading && loadedUsers && <UserList items={loadedUsers} />} 
    </React.Fragment>
}

export default Users;