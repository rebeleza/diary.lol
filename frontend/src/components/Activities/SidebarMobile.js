/** @jsx jsx */
import {css, jsx} from '@emotion/core'

const SidebarMobile = ({ showActivities, setShowActivities}) => {

    return(        
          <ul css={css`
          grid-area: sidebar-mobile;
          border-right: 1px solid black;
          height: 100%;
          text-align:left;            
          list-style-type: none;

          @media (min-width: 800px){
            display: none;
          }
        `}>
          <div id="menuToggle" css={css`
              display:block;
              padding-top: 20px;
              padding-left: 25px;
            `}onClick={() => {                
              setShowActivities(!showActivities)
            }}>
            <span className="MenuToggle"></span>
            <span className="MenuToggle"></span>
            <span className="MenuToggle"></span>
          </div>
        </ul>     
    )
  }

  export default SidebarMobile        