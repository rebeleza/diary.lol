/** @jsx jsx */
import { css, jsx } from '@emotion/core'
//import  {useEffect} from 'react';


const ActivityDate = ({dateTime} ) => {

    const monthNames = [
        'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 
        'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
    ]
    return(
        <div css={css`
            margin-top: 30px;
            text-align: right;
        `}>           
           <div css={css`
                font-size: 4rem;
           `}>
                {dateTime && dateTime.getDate()} 
            </div>
            <div css={css`
                font-size: 3rem;
           `}>
                {dateTime && monthNames[dateTime.getMonth()]}
            </div>
            <div css={css`
                font-size: 2rem;
           `}>
                { dateTime && dateTime.getHours()+ ':' + dateTime.getMinutes()} 
            </div>            
        </div>
      
    )
  }

  export default ActivityDate