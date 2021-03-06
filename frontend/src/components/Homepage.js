import React from 'react';
import logo from '../img/logo.GIF';
import screenshot from '../img/screenshot.png';
import {navigate} from '@reach/router'

const Homepage = () => {

    const addActivity = () =>{      
      navigate('add-first-activity')
    }
  
    return(
          <header className="Homepage">
          <img src={logo} className="Homepage-logo" alt="logo" />
          <div className='container'>
            <div className='left'>
                <img src={screenshot} className="screenshot" alt="screenshot" />
            </div>
            <div className='right'>
                <p>Ingresa tus actividades diarias en esta app fácil y divertida</p>
                <button onClick={addActivity}> Start </button>
            </div>
          </div>        
        </header>
   )
  }

  export default Homepage