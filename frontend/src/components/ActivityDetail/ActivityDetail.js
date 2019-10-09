/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import ActivityLocation from './ActivityLocation'
import ActivityDate from './ActivityDate' 
import xss from 'xss'
import { textAlign } from '@material-ui/system'

const ActivityDetail = ({ showActivities, currentActivity }) => {
    if (!currentActivity) return(<div></div>)
    return(        
          <div className="Detail" css={css`          
            display: ${showActivities ? 'none' : 'block'};
            grid-area: main;                      
          `}> 
            <div css= {css `
              display: grid;
              grid-template-columns: auto 300px;
              
            `}>
                <div>
                    <h1 css={css`
                        padding-top: 40px;
                        padding-bottom: 40px;
                        text-align: left;
                        margin-left: 50px;                        
                    `}>{currentActivity.title}</h1>            
                  <ActivityLocation location={currentActivity.location}/>
                </div>       
                <div css={css` 
                   margin-left: 10px;
                   margin-right: 10px;                                  
                   `}>
                  <ActivityDate dateTime = {currentActivity.dateTime} />            
                </div>                     
            </div>

            <div css= {css `
              margin-left: 50px;              
            `} dangerouslySetInnerHTML = {{ __html: xss(currentActivity.description) }} ></div>
          </div>        
   )
  }

  export default ActivityDetail