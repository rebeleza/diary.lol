/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import  {useEffect} from 'react';


const ActivityDate = ({dateTime} ) => {

    const monthNames = [
        'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 
        'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
    ]
    return(
        <div>   
            <div css={css`
                font-size: 2rem;
            `}>  {dateTime && dateTime.getDate()}</div>
            <div css={css`
                font-size: 1.5rem;
            `}>{dateTime && monthNames[dateTime.getMonth()]}</div>            
        </div>
      
    )
  }

  export default ActivityDate