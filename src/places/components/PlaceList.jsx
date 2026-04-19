import React from 'react'
import './PlaceList.css'
import Card from '../../shared/components/UIElement/Card'
import PlaceItem from './PlaceItem';

const PlaceList = (props) => {
    console.log(props,"placessss")
    if (props.items.length === 0) {
        return (
            <div className='place-list center'>
                <Card>
                    <h2 className="">No places found. Maybe create one?</h2>
                    <button type="" className="">Share Place</button>
                </Card>
            </div>
        );
    }
    return (<ul className='place-list'>
        {props.items.map(place => (<PlaceItem key={place._id} id={place._id} image={place.placeImage} title={place.title} description={place.description} adress={place.address} creatorId={place.creator} coordinates={place.location} />))}
    </ul>);
};

export default PlaceList