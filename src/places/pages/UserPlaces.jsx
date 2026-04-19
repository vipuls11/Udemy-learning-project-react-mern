import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaceList from '../components/PlaceList'
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElement/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner';

// const DUMMY_PLACES = [
//     {
//         id: 'p1',
//         title: 'Empire State Building',
//         description: 'One of the famous sky scrapers in the world!',
//         imageUrl: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRSgW1ILkSL8kjyYrtZUoFLXoT0ZDNgDsbgpji9-DwnUxM0Ao314VvhQcdEeWRUrg97taaPQdolNk7n056fYGKmn8okvqv4b0rIKYw_nw',
//         address: 'Infozzle Software Solutions Pvt. Ltd., 137, Damji Shamji Industrial Estate, Lal Bahadur Shastri Marg, Vikhroli (W, Surya Nagar, HMPL Surya Nagar, Vikhroli West, Mumbai, Maharashtra 400083',
//         location: {
//             lat: 19.1157739,
//             lng: 72.8431854,
//         },
//         creator: 'u1'
//     },
//     {
//         id: 'p2',
//         title: 'Empire State Building',
//         description: 'One of the famous sky scrapers in the world!',
//         imageUrl: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTNgBtrwwTGysqt-2hOFqlyPP5VbRKovDQ2S6xmu15TCkSzQtXjRwQ3WuGeWTF06UNigBd-dyV46eyBEmmL0G0o03Nj_WgQqpx9z4Qtyw',
//         address: 'Infozzle Software Solutions Pvt. Ltd., 137, Damji Shamji Industrial Estate, Lal Bahadur Shastri Marg, Vikhroli (W, Surya Nagar, HMPL Surya Nagar, Vikhroli West, Mumbai, Maharashtra 400083',
//         location: {
//             lat: 19.1157739,
//             lng: 72.8431854,
//         },
//         creator: 'u2'
//     },
//     {
//         id: 'p3',
//         title: 'Empire State Building',
//         description: 'One of the famous sky scrapers in the world!',
//         imageUrl: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSQOcprHNcFkJhMOlL2lAsoBysVuB5P_eS78geu87Lc3FO8TKhPUeZzvPj32naG5PcReIhXSNLtcgbIF2uShg-LoI9MnyPafENYl1aIQQ',
//         address: 'Infozzle Software Solutions Pvt. Ltd., 137, Damji Shamji Industrial Estate, Lal Bahadur Shastri Marg, Vikhroli (W, Surya Nagar, HMPL Surya Nagar, Vikhroli West, Mumbai, Maharashtra 400083',
//         location: {
//             lat: 19.1157739,
//             lng: 72.8431854,
//         },
//         creator: 'u3'
//     }

// ]

const UserPlaces = () => {
      const [loadedPlaces, setLoadedPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;
console.log(userId, "vipul")

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_Place_URI}/places/${userId}`
        );
        console.log(responseData.getAllPlaces.places, "rahul")
        setLoadedPlaces(responseData.getAllPlaces.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces =>
      prevPlaces.filter(place => place.id !== deletedPlaceId)
    );
  };
  console.log(loadedPlaces, "sdsdfdfs")
    return (
          <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </React.Fragment>
    );
}

export default UserPlaces;