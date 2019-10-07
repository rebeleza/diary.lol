/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import React, {useState} from 'react';
import MapPicker from './AddActivity/MapPicker';
import DatePicker from './AddActivity/DatePicker'

const AddActivity = ({ storeActivity, setScreen }) => {
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState({})
    const [description, setDescription] = useState('')
    const [dateTime, setDateTime] = useState(new Date())
    
    const addActivity = () => {    
        storeActivity({ title,location, description, dateTime })
        setScreen('activities')        
    }

    return(
        <div className="AddActivity"  css={css`
            margin-top: 20px;            
        `}>
            <h2>Activity TITLE</h2>      
            <input onChange={event => setTitle(event.target.value)}/>

            <DatePicker dateTime={dateTime} setDateTime={setDateTime}/>
            <div>
            <MapPicker location={location} setLocation={setLocation}/>
            </div>
            <h2>Activity description</h2>      
            <textarea onChange={event => setDescription(event.target.value)}></textarea>
            <p></p>
            <button onClick={addActivity}> Save Activity </button>
        </div>
      
    )
  }

  export default AddActivity