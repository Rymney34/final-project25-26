import { useCallback, useEffect, useState } from "react";

import { useParams } from 'react-router-dom';

import './eachMuseum.css'
import locationImage from '../../../resources/img/location_on.png';
import calendar from '../../../resources/img/calendar.png';
import planVisit from '../../../resources/img/planVisit.png';
import phone from '../../../resources/img/phone.png';
import time from '../../../resources/img/time.png';
import accessibility from '../../../resources/img/accessibility.png';
import QuickInfoItem from '../../components/quickInfoItem/quickInfoItem';
import { ImportantMuseumInfo } from '../../components/importantMuseumInfo/importantMuseumInfo';
import EachMuseumSlider from '../../components/eachMuseumSlider/eachMuseumSlider';
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";
import Button from "../../components/Tools/button/button";


const API = import.meta.env.VITE_API_URL;

const EachMuseum = () => {

    const {id} = useParams();
    const [museumData, setMuseumData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTour, setActiveTour] = useState(null);
    const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
        const getEachMuseum = async () => {
            try{
                const response = await axios.get(`${API}/api/getEachMuseum/${id}`)
                setMuseumData(response.data);
                console.log(response);
                console.log(response.data)
                setLoading(false);
            }
            catch(error){
                console.error("error fetching details", error)
                setLoading(false)
            }
        }
        getEachMuseum()
    },[id]);

    const loadMore = () => {

        setVisibleCount(prevCount => prevCount + 6);
    }

   

    if (loading) return <div style={{padding: 100}}><Spinner /></div>;
    if (!museumData) return <div style={{ padding: 100 }}>Museum Not Found!</div>

    const { firstPageImage, accessiblityInfo, contactInfo, location, map, map3d, museumTitle, openingTime, video, virtualTours, slider} = museumData

    const displayedTours = virtualTours.slice(0, visibleCount)
    
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
                        <Button text="Find Out More" style={{ margin: "50px 0 0 0", fontSize: 24, width: 200, height: 66, borderRadius: 50, backgroundColor: "var(--red-color)"}}/>
                    </div>
                </div>
            </div>
            <div className='planYourVisitWrapper'>
                <div className="planYourVisitTitle">
                    <h2>Plan Your Visit</h2>
                </div>
                <div className="planYourVisitContent">
                    <QuickInfoItem img={locationImage} title="Location" text="Browse all our museums, galleries and historic sites" btnText="Find Out More!" />
                    <QuickInfoItem img={calendar} title="What's On" text="Find event, exhibitions and workshops near you" btnText="View Event" />
                    <QuickInfoItem img={planVisit} title="Plan Your Visit" text="Accessibility, FAQ's and museums information" btnText="Visitor Info" onClick={() => { navigate("/about") }} />
                </div>
            </div>
            <div className='museumContentSlider'>
                <EachMuseumSlider slides={slider}/>
            </div>
            <div className='museumVideoWrapper'>
                <div className='blockTitle'>
                    <h2> Exhibits Highligths Video</h2>
                </div>  
                <div className='videoBlockWrapper'>
                    <video>
                        <source src={video}/>
                    </video>
                </div>
            </div>
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
            <div className='googleStreetViewWrapper'>
                <div className='googleStreetViewTitle'>
                    <h2>Google Street View (360)</h2>

                </div>
                <div>
                     <iframe src="https://www.google.com/maps/embed?pb=!4v1774222227507!6m8!1m7!1smqgd5k54VB9WDhhezFuNrw!2m2!1d53.47733364364755!2d-2.243749915640756!3f154.07979!4f0!5f0.7820865974627469" width="1250" height="700"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"> 
                    </iframe>                 
                </div>
            </div>
            <div className='museumLastImportantBlockWrapper'>
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
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2374.505030518793!2d-2.2462693231118043!3d53.47730557232764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb1c01998181f%3A0xd6ec4a6aad2bd206!2sFaulkner%20Court%2C%20Faulkner%20St%2C%20Manchester%20M1%204EE!5e0!3m2!1sru!2suk!4v1774223079430!5m2!1sru!2suk"
                            className="bottomMap"
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade"
                            >

                            </iframe>
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
        </div>
    )
}

export default EachMuseum