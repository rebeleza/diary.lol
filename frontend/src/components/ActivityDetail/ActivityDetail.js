/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import ActivityLocation from './ActivityLocation'
import ActivityDate from './ActivityDate' 

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
                  <ActivityDate dateTime = {currentActivity.dateTime} />            
            </div>

            <p>{currentActivity.description}</p>
          </div>        
   )
  }

  export default ActivityDetail