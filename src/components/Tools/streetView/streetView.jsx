import {
    LoadScript,
    GoogleMap,
    StreetViewPanorama,



} from "@react-google-maps/api";


export default function GoogleStreetView({coords}) {

    const [latStr, lngStr] = coords.split(",")

    const position = { lat: parseFloat(latStr.trim()), lng: parseFloat(lngStr.trim()) }
    const containerStyle = {
        height: "650px",
        width: "1000px"
    };
    const center = {
        lat: 54.364442,
        lng: 18.643173
    };
    return (
            <div >
                <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={10}>
                    <StreetViewPanorama
                        id="street-view"
                        mapContainerStyle={containerStyle}
                        position={position}
                        visible={true}
                    />
                </GoogleMap>
            </div>

       
    )
}
