/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import  {useEffect} from 'react';
import L from 'leaflet'
import '../../leaflet/leaflet.css'

let mapInstance = null

const initalizeMap = (location, setLocation) =>{
    const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});

        mapInstance = L.map('mapid')
// recuperar geolocation
window.navigator.geolocation.getCurrentPosition(position => {    
    
    if (!mapInstance){
        return
    }
    const latlng = [location.lat|| position.coords.latitude, location.lng || position.coords.longitude]
    
    mapInstance = mapInstance.setView(latlng, 13).addLayer(osm);	

	L.circle(latlng,150, {
            color: 'red',
            opacity: 0.6,
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(mapInstance).bindPopup("<b>Activity Location</b><br />").openPopup();
    
    L.marker(latlng).addTo(mapInstance).bindPopup("Activity Location").openPopup();
    
    mapInstance.on('click', event => {  
        
        setLocation({
            lat: event.latlng.lat,
            lng: event.latlng.lng
        })      
	    const popup = L.popup()
		popup
			.setLatLng(event.latlng)
			.setContent("Activity Location " + event.latlng.toString())
			.openOn(mapInstance)
	});

}, error => {
    console.log(error)
},{
})        
    	
}

const MapPicker = ({location, setLocation} ) => {

useEffect(() => {    
    initalizeMap(location, setLocation)

    return () => {
        if (!mapInstance) return
        
        mapInstance.off();    
        mapInstance.remove();           
    }
}, [location, setLocation])  

    return(
        <div className="MapPicker">          
            <div id="mapid" css={css`                   
                width: 100%; 
                height: 250px;
            `}></div>
        </div>
      
    )
  }

  export default MapPicker