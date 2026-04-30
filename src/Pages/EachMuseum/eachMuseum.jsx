import { useCallback, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import './eachMuseum.css'
import locationImage from '../../../resources/img/location_on.png';
import calendar from '../../../resources/img/calendar.png';
import planVisit from '../../../resources/img/planVisit.png';
import phone from '../../../resources/img/phone.png';
import time from '../../../resources/img/time.png';
import accessibility from '../../../resources/img/accessibility.png';
import QuickInfoItem from '../../components/quickInfoItem/quickInfoItem.jsx';
import { ImportantMuseumInfo } from '../../components/importantMuseumInfo/importantMuseumInfo';
import EachMuseumSlider from '../../components/eachMuseumSlider/eachMuseumSlider';
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";
import Button from "../../components/Tools/button/button";
import StreetView from "../../components/Tools/streetView/streetView";
import GoogleMap from "../../components/Tools/googleMap/googleMap";
import GoogleStreetView from "../../components/Tools/streetView/streetView.jsx";
import {
    LoadScript,
    useJsApiLoader,
} from "@react-google-maps/api";

const API = import.meta.env.VITE_API_URL || "";
const googleAPI = import.meta.env.VITE_API_KEY

const EachMuseum = () => {
    const refBottom = useRef(null)
    const navigate = useNavigate()
    const {id} = useParams();
    const [museumData, setMuseumData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTour, setActiveTour] = useState(null);
    const [visibleCount, setVisibleCount] = useState(6);

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleAPI
    })

    useEffect(() => {
        //getting each musseum from backend db
        const getEachMuseum = async () => {
            try{
                const response = await axios.get(`${API}/api/getEachMuseum/${id}`)
                setMuseumData(response.data);
                setLoading(false);
            }
            catch(error){
                console.error("error fetching details", error)
                setLoading(false)
            }
        }
        getEachMuseum()
    },[id]);

    //loadmore button
    const loadMore = () => {

        setVisibleCount(prevCount => prevCount + 6);
    }

    if (loading) return <div style={{padding: 100}}><Spinner /></div>;
    if (!museumData) return <div style={{ padding: 100 }}>Museum Not Found!</div>

    const { firstPageImage, accessiblityInfo, contactInfo, location, map, map3d, museumTitle, openingTime, video, virtualTours, slider} = museumData

    const displayedTours = virtualTours.slice(0, visibleCount)
    //url for better video representation
    const getEmbedUrl = (url) => {
        if(!url) return "";

        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return(match && match[2].length === 11)
            ? `https://www.youtube.com/embed/${match[2]}`
            : url
    }

    return(
        
        <div className='eacMuseumWrapper'>
            
            <div className='firstMuseumBlockInfo'>
                <div className='imageLeftBlock'>
                    <img src={firstPageImage} alt="museum cover page"/>
                </div>
                <div className='museumInfoBlock'>
                    <div className='eachMuseumTitle'>
                        <h2>{museumTitle}</h2>
                    </div>
                    <div className='museumFirstInfo'>
                        <div className='openingHours'>
                            <h3 className='openingTimeTitle'>Opening Time:</h3>
                            <p className='openingTimePara'>
                                Usually {openingTime}

                            </p>
                        </div>
                        <div className='locationInfo'>
                            <h3 className='locationTitle'>Location:</h3>
                            <address className='museumAddress'>
                                {location}
                            </address>
                        </div>
                            <Button text="Find Out More" onClick={() => refBottom.current?.scrollIntoView({ behavior: "smooth" })} style={{ margin: "50px 0 0 0", fontSize: 24,  height: 66, borderRadius: 50, color: "white", backgroundColor: "var(--red-color)"}}/>
                    </div>
                </div>
            </div>
            <div className='planYourVisitWrapper'>
                <div className="planYourVisitTitle">
                    <h2>Plan Your Visit</h2>
                </div>
                <div className="planYourVisitContent">
                        <QuickInfoItem img={locationImage} title="Location" text="Browse all our museums, galleries and historic sites" btnText="Find Out More!" onClick={() => navigate("/allMuseums")} />
                        <QuickInfoItem img={calendar} title="What's On" text="Find event, exhibitions and workshops near you" btnText="View Event" onClick={() => navigate("/allEvents") } />
                        <QuickInfoItem img={planVisit} title="Plan Your Visit" text="Accessibility, FAQ's and museums information" btnText="Visitor Info" onClick={() => navigate("/about") } />
                </div>
            </div>
            <div className='museumContentSlider'>
                <EachMuseumSlider slides={slider}/>
            </div>
                {video.length > 0 ? <div className='museumVideoWrapper'>
                    <div className='blockTitle'>
                        <h2> Exhibits Highlights Video</h2>
                    </div>
                    <div className='videoBlockWrapper'>
                        <iframe 
                            
                            className="videoMuseumContent"
                            src={getEmbedUrl(video)} 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" 
                            allowfullscreen
                        >

                        </iframe>
                    </div>
                </div> :" "}
            
            {displayedTours && displayedTours.length > 0 ? (
            <div className='virtualMuseumToursWrapperDiv'>
            
                <div className='virtualMuseumTitle'>
                    <h2>Virtual Museum Tour</h2>
                </div>
                <div className='allMuseumVirtualTours'>
                    
                    {/* <iframe src="https://my.matterport.com/show?play=1&lang=en-US&m=FShi7mPqZuM" /> */}
                    {displayedTours.length > 0 ? (
                
                        displayedTours.map((item,i) => {
                            console.log(item.tour);
                                return (
                                    <div key={i} className='virTourWrapper' onClick={() => setActiveTour(item.tour)}>
                                        <div className="iframeOverlay">Click to view Tour</div>
                                        <iframe className="virtulIframe" src={item.tour} />
                                    </div>
                                ) 
                            })
                        ) : <Spinner />

                    }

                    {activeTour && (
                        <div className="modalBackdrop" onClick={() => setActiveTour(null)}>
                            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                                <Button style={{backgroundColor: "var(--red-color)",position: "absolute", top: "-40px", right: 0}}text="Close" onClick={() => setActiveTour(null)}/>
                                <iframe
                                    src={activeTour}
                                    className="fullIframe"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}
                </div>
           
                {visibleCount < virtualTours.length && (
                    <Button style={{ backgroundColor: "var(--red-color)", margin: "40px 0px 0px 0px" }} text="Load More" onClick={loadMore}/>
                )}
                    
               
            </div>
             ) : " "}
            {isLoaded ? <div>
                <div className='googleStreetViewWrapper'>
                    <div className='googleStreetViewTitle'>
                        <h2>Google Street View (360)</h2>

                    </div>
                    <div className="googleStreetContentWrapper">

                        <GoogleStreetView coords={map3d} />
                    </div>
                </div>

                <div ref={refBottom} className='museumLastImportantBlockWrapper'>
                    <div className='museumImportantInfoTitle'>
                        <h2>Contact {museumTitle}</h2>
                    </div>
                    <div className="middleMuseumImportantBlock">
                        <div className='leftMuseumImportantBlock'>
                            <ImportantMuseumInfo title="Our location:" icon={locationImage} blockInfo={location} />
                            <ImportantMuseumInfo title="Contact Us:" icon={phone} blockInfo={contactInfo} />

                        </div>
                        <div className='rightMuseumImportantBlock'>
                            <div className='museumMapLocationWrapper'>

                                <GoogleMap coords={map} />
                            </div>


                        </div>
                    </div>

                    <div className='bottomMuseumImportantBlock'>
                        <ImportantMuseumInfo title="Opening Hours:" icon={time} blockInfo={openingTime} />
                        <div className="rightBottomMuseumImportantBlock">
                            <ImportantMuseumInfo title="Accessibility:" icon={accessibility} blockInfo={accessiblityInfo} />
                        </div>

                    </div>
                </div>
          </div>  : <Spinner/>}  
            
        </div>
    )
}

export default EachMuseum