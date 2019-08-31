import React, {useState} from 'react';

const AddActivity = ({ storeActivity }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    
    const saveActivity = () => {
        storeActivity({ title, description })
    }

    return(
        <div className="AddActivity">
            <h2>Activity TITLE</h2>      
            <input onChange={event => setTitle(event.target.value)}/>
            <h2>Activity description</h2>      
            <textarea onChange={event => setDescription(event.target.value)}></textarea>
            <p></p>
            <button onClick={saveActivity}> Save Activity </button>
        </div>
      
    )
  }

  export default AddActivity