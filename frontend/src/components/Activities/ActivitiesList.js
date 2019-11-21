/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import ActivityListDate from './ActivityListDate'
import {navigate} from '@reach/router'

import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
 
const ActivitiesList = ({ activities, showActivities, setShowActivities, setCurrentActivity, loggedin}) => {

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
    grid-template-rows: 1px auto 80px;
    `}>
      <Query
        query={gql`
            { 
            activities{
                  title 
                  description
                  datetime
                }
              }
          `}
      >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading</p>
            if (error) {
               // navigate ('/')
              // console.error(error)
                return <p></p>
            }
            console.log(data)
            return <ul>{data.activities.map(item => <li key={item.title}> {item.title} </li> )}</ul>
            }}
      </Query>
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
                  navigate('/activities/' + activity.key)
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
            
            if (!loggedin) {navigate('/register')
              return
            }
            navigate('/add-activity')
          }}>                    
          <span role="img" aria-label="Plus Add" >➕</span> 
        </button>
      </div>
    </div>

  )
}

export default ActivitiesList                