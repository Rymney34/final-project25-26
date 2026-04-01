import { 
    APIProvider,
    Map,
    AdvancedMarker,
    
    
} from '@vis.gl/react-google-maps';

import './googleMap.css'


export default function GoogleMap({coords}){
    const [latStr, lngStr] = coords.split(",")

    const position = { lat: parseFloat(latStr.trim()), lng: parseFloat(lngStr.trim()) }
    return(
        <APIProvider>
            <div className='mapDimensions'>
                <Map zoom={18} center={position}>

                </Map>
            </div>

        </APIProvider>
    )
}
