import React from 'react'
import './PlaceList.css'
import Card from '../../shared/components/UIElement/Card'
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';

const PlaceList = (props) => {
    //console.log(props,"placessss")
    if (props.items.length === 0) {
        return (
            <div >
                <Card className='no-place'>
                    <h2 className="">No places found. Maybe create one?</h2>
                    <Button type="" to="/places/new">Add place</Button>
                </Card>
            </div>
        );
    }
    return (<ul className='place-list'>
        {props.items.map(place => (<PlaceItem key={place._id} id={place._id} image={place.placeImage} title={place.title} description={place.description} address={place.address} creatorId={place.creator} coordinates={place.location} onDeletePlace={props.onDeletePlace}/>))}
    </ul>);
};

export default PlaceList