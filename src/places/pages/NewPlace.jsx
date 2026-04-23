import React, { 
  useContext,
} from 'react';
// import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

import ImageUpload from '../../shared/components/FormElements/ImageUpload';

import './PlaceForm.css';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElement/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../util/validators';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SuccessModal from '../../shared/components/UIElement/SuccessModel';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error,successMessage, sendRequest, clearError ,clearSuccess} = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      placeImage: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('placeImage', formState.inputs.placeImage.value);
      await sendRequest(`${process.env.REACT_APP_API_Place_URI}/place`, 'POST', formData, {
        Authorization: 'Bearer ' + auth.token
      });
      history.push('/');
    } catch (err) {}
    console.log(`${process.env.REACT_APP_API_Place_URI}/place`, "New Place")
  };
  return (
    <React.Fragment>
    {successMessage && <SuccessModal header="Success Message" successMessage={successMessage} onClear={clearSuccess} />}
       <ErrorModal error={error} 
       onClear={clearError} 
       /> 
      
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />} 
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
           validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
           onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
           validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
           onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload
          id="placeImage"
           onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Button type="submit" disabled={!formState.isValid}
        >
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
