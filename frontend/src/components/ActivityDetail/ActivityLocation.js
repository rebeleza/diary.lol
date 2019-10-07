/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import  {useEffect} from 'react';
import L from 'leaflet'
import '../../leaflet/leaflet.css'

let mapInstance = null

const initalizeMap = location =>{
    if (!location) return
    if (!location.lat || !location.lng) return

    const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, 
            {maxZoom: 18, 
             attribution: osmAttrib
            });
            
     mapInstance = L.map('mapid', 
        {closePopupOnClick: false,       
        doubleClickZoom: false
        }).setView([location.lat
        , location.lng ], 13).addLayer(osm);	

	L.circle([location.lat 
        , location.lng ],150, {
            color: 'red',
            opacity: 0.6,
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(mapInstance).openPopup();
    
    const myIcon = L.icon({
        iconUrl: './img/marker-icon-2x.png',
        iconSize: [28,45],
        iconAnchor: [12,44]
    })

    L.marker([location.lat 
            , location.lng ], {icon: myIcon}).addTo(mapInstance).openPopup();
}

const ActivityLocation = ({location} ) => {

useEffect(() => {    
    initalizeMap(location)

    return () => {
        if (!mapInstance) return
        
        mapInstance.off();
        mapInstance.remove();         
    }
}, [location])

if (!location || !location.lat || !location.lng ) {
    mapInstance = null    
    return(    
    <div>- No Location -</div>
    )
}    


    return(
        <div className="ActivityLocation" css={css`            
        padding-top: 30px;
        padding-bottom: 30px;
        margin-left: 50px;
        `}>                       
            <div id="mapid" css={css`    
                margin: 0 auto;                           
                width: 100%; 
                height: 200px;
            `}></div>
        </div>
      
    )
  }

  export default ActivityLocation