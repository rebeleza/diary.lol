/** @jsx jsx */
import {css, jsx} from '@emotion/core'

const EmptyStateScreen = () => {

        return <h1 css={css`  
                    padding-left: 10px;                        
                    padding-top: 25%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    
                    @media (max-width: 800px){
                      display: none;                      
                     }   
                    `}>SELECT OR ADD AN ACTIVITY!
                </h1>        
    }

  export default EmptyStateScreen