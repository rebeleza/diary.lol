/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import {useState} from 'react';
import MapPicker from './MapPicker';
import DatePicker from './DatePicker'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import xss from 'xss'

const AddActivity = ({comingFromHomePage, storeActivity, setScreen, reloadActivities }) => {
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState({})
    const [description, setDescription] = useState('')
    const [dateTime, setDateTime] = useState(new Date())
    
    const addActivity = () => {    
        if (!title){
            alert('Please enter a title')
            return
        }
        if(!location){
            alert('Please select a Location')
            return
        }

        setDescription(xss(description))
        setTitle(xss(title))
        
        storeActivity({ title,location, description, dateTime })
        reloadActivities()
        setScreen('activities')        
    }

    return(
        <div className="AddActivity"  css={css`
            display: grid;
            grid-template-rows: 80px 300px auto;     
            max-width: 1000px;
            margin: 0 auto;       
        `}>
            <div>
                {comingFromHomePage ? '' :
                    <button className="backButton" onClick={() => {setScreen('activities')}}>🢨 Back</button>
                }
                <button  className="saveButton" onClick={addActivity}> Save Activity </button>
            </div>
            <div css={css`
                display: grid;
                grid-template-columns: 50% 50%;     
                padding-top: 20px;     
            `}>
                <div >                
                <input css={css`
                    padding: 20px;     
                    width: 400px;
                    font-size: 2rem;
                `} onChange={event => setTitle(event.target.value)}
                placeholder='Enter the activity name'/>
                <DatePicker dateTime={dateTime} setDateTime={setDateTime}/>            
                </div>
                <MapPicker location={location} setLocation={setLocation}/>            
            </div>
            <div>                
                <ReactQuill value={description}
                    onChange={value => setDescription(value)}
                    placeholder='Enter the activity description'
                    />
            </div>           
        </div>
      
    )
  }

  export default AddActivity