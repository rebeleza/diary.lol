/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import ActivityLocation from './ActivityLocation'
import ActivityDate from './ActivityDate' 
import xss from 'xss'
import {navigate} from '@reach/router'
//import { textAlign } from '@material-ui/system'

const ActivityDetail = ({ showActivities, currentActivity,  setCurrentActivity,  reloadActivities, deleteActivity, activityId, activities }) => {

    if (!currentActivity && activityId) {      
        const activity = activities.filter(item => {
          if (item.key === parseInt(activityId)) return true
          return false
        })[0]
        console.log(activity)
        setCurrentActivity(activity)
        return ' '
    }

    const deleteActivityHandler = () => {
     if (!window.confirm('Do you really want to delete this activity?')){
       return
     }
     deleteActivity(currentActivity.key)
     reloadActivities()    
     navigate('activities')
     setCurrentActivity(null)
    }

    return(       
        <div>                   
          <div className="Detail" css={css`          
            display: ${showActivities ? 'none' : 'block'};
            grid-area: main;              
            padding-left: 40px;       
            padding-right: 40px;                    
          `}>             
            <div css= {css `
              display: grid;
              grid-template-columns: auto 100px ;              
            `}>
                <div>
                    <h1 css={css`
                        padding-top: 40px;
                        padding-bottom: 10px;
                        text-align: left;                                        
                    `}>{currentActivity.title}</h1>            
                  <ActivityLocation location={currentActivity.location}/>
                </div>       
                <div css={css` 
                   margin-left: 10px;                   
                   `}>
                  <ActivityDate dateTime = {currentActivity.dateTime} />            
                </div>                     
            </div>
            <div className="DetailDescription" css= {css `
                  font-size: 1.5rem;                
            `} dangerouslySetInnerHTML = {{ __html: xss(currentActivity.description) }} >              
            </div>
            </div>
            <div   css={css`
              display: grid;              
              font-size:1rem;                                                                                                   
              margin-top: 30px;
              border-top: 1px solid;
              padding-left: 40px;       
              padding-right: 40px;      
            `}>
              <div>
                  <button className="deleteButton" onClick={deleteActivityHandler} >Delete</button>
                  <div></div>
                  <button  className="saveButton"> Edit Activity </button>
              </div>
            </div>
          </div>        
   )
  }

  export default ActivityDetail