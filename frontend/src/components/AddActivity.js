import React, {useState} from 'react';

const AddActivity = ({ storeActivity, setScreen }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    
    const addActivity = () => {
        storeActivity({ title, description })
        setScreen('activities')        
    }

    return(
        <div className="AddActivity">
            <h2>Activity TITLE</h2>      
            <input onChange={event => setTitle(event.target.value)}/>
            <h2>Activity description</h2>      
            <textarea onChange={event => setDescription(event.target.value)}></textarea>
            <p></p>
            <button onClick={addActivity}> Save Activity </button>
        </div>
      
    )
  }

  export default AddActivity