/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import ActivityListDate from './ActivityListDate'

const ActivitiesList = ({ activities, showActivities, setShowActivities, setCurrentActivity, setScreen }) => {

  return (
    <div css={css`
    grid-area: sidebar-desktop;
    border-right: 1px solid black;
    height: 100%;
    text-align:left;            
    
    @media (max-width: 800px){
    display: ${showActivities ? 'block' : 'none'};
    }

    display: grid;
    grid-template-rows: auto 80px;
    `}>
      <ul className="List" css={css`              
          list-style-type: none;
        `}>
        {activities.map((activity, index) => {
          return <li key={index} css={css`                    
                  padding: 10px;
                  
                  border-bottom: 1px solid black;
                  display: grid;
                  grid-template-columns: 50px auto;
                  &:hover {
                    background-color: lightblue;                      
                    cursor: pointer;
                  }

                  @media (max-width: 800px){
                      display: ${showActivities ? 'block' : 'none'};
                  }
                `} onClick={() => {
              setCurrentActivity(activity)
              setShowActivities(false)
            }}>           
              <ActivityListDate dateTime={activity.dateTime} />                                       
              <div css={css`
                margin-top:3px;
                font-size: 1.2rem;
              `}> 
                {activity.title}</div>                
                    
          </li>
        })}
      </ul>
      <div css={css`
              text-align:center;
              border-top: 1px solid black;
              padding-top: 15px;
              `}>
        <button css={css`
              text-align:center;
              font-size: 2rem;
              padding-left: 30px
              padding-right:30px;
              outline: none;
              background: lightblue;
              color: #fff;
              `}

          onClick={() => {
            setScreen('addActivity')
          }}>                    
          <span role="img" aria-label="Plus Add" >➕</span> 
        </button>
      </div>
    </div>

  )
}

export default ActivitiesList                