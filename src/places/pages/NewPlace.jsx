import React from 'react';
import './NewPlace.css'
import { VALIDATOR_REQUIRE } from '../../../src/util/validators';
import Input from '../../shared/components/FormElements/Input';

const NewPlace = props => {


    return (
        <>
            <div className={`Newplace-div`}>
                <h1>Form</h1>
                <form className='place-form'>
                    <Input element='input' type='text' label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid title." />
                    <Input element='' type='text' label="Title" validators={[]} errorText="Please enter a valid title." />
                </form>
            </div>
        </>
    );
};


export default NewPlace