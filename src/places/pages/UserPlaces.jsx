import React from 'react'
import { useParams } from 'react-router-dom'
import PlaceList from '../components/PlaceList'

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the famous sky scrapers in the world!',
        imageUrl: '',
        address: 'Infozzle Software Solutions Pvt. Ltd., 137, Damji Shamji Industrial Estate, Lal Bahadur Shastri Marg, Vikhroli (W, Surya Nagar, HMPL Surya Nagar, Vikhroli West, Mumbai, Maharashtra 400083',
        location: {
            lat: 19.1157739,
            lng: 72.8431854,
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the famous sky scrapers in the world!',
        imageUrl: '',
        address: 'Infozzle Software Solutions Pvt. Ltd., 137, Damji Shamji Industrial Estate, Lal Bahadur Shastri Marg, Vikhroli (W, Surya Nagar, HMPL Surya Nagar, Vikhroli West, Mumbai, Maharashtra 400083',
        location: {
            lat: 19.1157739,
            lng: 72.8431854,
        },
        creator: 'u2'
    },
    {
        id: 'p3',
        title: 'Empire State Building',
        description: 'One of the famous sky scrapers in the world!',
        imageUrl: '',
        address: 'Infozzle Software Solutions Pvt. Ltd., 137, Damji Shamji Industrial Estate, Lal Bahadur Shastri Marg, Vikhroli (W, Surya Nagar, HMPL Surya Nagar, Vikhroli West, Mumbai, Maharashtra 400083',
        location: {
            lat: 19.1157739,
            lng: 72.8431854,
        },
        creator: 'u3'
    }

]

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return (
        <div><PlaceList items={loadedPlaces} /></div>
    );
}

export default UserPlaces