/** @jsx jsx */
import { css, jsx } from '@emotion/core'
//import  {useEffect, useState} from 'react';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

const DatePicker = ({dateTime, setDateTime} ) => {

    const setNewDateTime = newDateTime => {
        setDateTime(newDateTime.toDate())
    }
    return(
        <div css={ css`
            margin-top: 30px;
            padding-top: 30px;
            padding-bottom: 30px;            
        `}>      
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker value={dateTime} onChange={setNewDateTime} ampm={false} />
            </MuiPickersUtilsProvider>                        
        </div>       
    )
  }

  export default DatePicker