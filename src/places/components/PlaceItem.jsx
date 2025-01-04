import React, { useState } from 'react'
import './PlaceItem.css'
import Card from '../../shared/components/UIElement/Card'
import Modal from '../../shared/components/Modal'
import Button from '../../shared/components/FormElements/Button'
import Map from '../../shared/components/UIElement/Map'


const PlaceItem = (props) => {
    const [showMap, setShowMap] = useState(false)

    const openMapHandler = () => {
        setShowMap(true)
    }

    const closeMapHandler = () => {
        setShowMap(false)
    }

    return (
        <React.Fragment>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}>
                <div className="map-container">
                    {/* <h2>The MAP!</h2> */}
                    <Map center={props.coordinates} zoom={16} />
                    <div>
                        {/* <div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230661.43326855198!2d81.5062093044611!3d25.401968721311718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398534c9b20bd49f%3A0xa2237856ad4041a!2sPrayagraj%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1735971178791!5m2!1sen!2sin"
                                width="100%"
                                height="250"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div> */}
                    </div>
                </div>
            </Modal>
            <li className='place-item'>
                <Card className='place_item__content'>
                    <div className='place-item__image'>
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className='place-item__info'>
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        <Button to={`/places/${props.id}`}>EDIT</Button>
                        <Button>DELETE</Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
}

export default PlaceItem