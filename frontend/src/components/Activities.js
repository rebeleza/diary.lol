import {useState} from 'react'

/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import ActivityDetail from './ActivityDetail/ActivityDetail.js';
import SidebarMobile from './Activities/SidebarMobile.js';
import ActivitiesList from './Activities/ActivitiesList.js';
import EmptyStateScreen from './Activities/EmptyStateScreen'

import {Router} from '@reach/router'

const Activities = ({ activities, reloadActivities, deleteActivity, loggedin}) => {

    const [showActivities,setShowActivities] = useState(false)
    const [currentActivity, setCurrentActivity] = useState(null)

    return(
        <div className="Activities" css={css`
            display: grid;
            grid-template-columns: 300px auto; 
            grid-template-areas: "sidebar-desktop main";
            width: 100vw;
            height: 100vh;

            @media (max-width: 800px){
              grid-template-columns: 80px auto;
              grid-template-areas: "sidebar-mobile
              ${showActivities ? 'sidebar-desktop' : 'main'}";
            }
            `}>
          <ActivitiesList 
            activities={activities} 
            showActivities={showActivities} 
            setShowActivities={setShowActivities}             
            setCurrentActivity={setCurrentActivity}
            loggedin={loggedin}
            />         
          
          <SidebarMobile 
            showActivities={showActivities} 
            setShowActivities={setShowActivities}
          />            

          <Router>
              <ActivityDetail 
                showActivities={showActivities} 
                currentActivity={currentActivity}
                setCurrentActivity={setCurrentActivity}
                deleteActivity={deleteActivity}
                reloadActivities={reloadActivities}           
                activities={activities}
                path="/:activityId"                
                />
              <EmptyStateScreen path='/' />
            </Router>            
        </div>
   )
  }

  export default Activities