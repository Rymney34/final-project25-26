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

    if(loading) return <Spinner/>;
    if(!museumData) return <div>Museum Not Found!</div>

    const { firstPageImage, accessabilityInfo, contactInfo, location, map, map3d, museumTitle, openingTime, video, virtualTours, slider} = museumData

    
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
            <div className='virtualMuseumToursWrapperDiv'>
                <div className='virtualMuseumTitle'>
                    <h2>Virtual Museum Tour</h2>

                </div>
                <div className='allMuseumVirtualTours'>
                    {virtualTours.map((tour,i) => {
                        <div key={i} className='virTourWrapper'>
                            <iframe src={tour} />
                        </div>
                    })}
                  
                </div>
            </div>
            <div className='googleStreetViewWrapper'>
                <div className='googleStreetViewTitle'>
                    <h2>Google Street View (360)</h2>

                </div>
                <div>

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
                            <map>

                            </map>
                        </div>

                    </div>
                </div>
                
                <div className='bottomMuseumImportantBlock'>
                    <ImportantMuseumInfo title="Opening Hours:" icon={time} blockInfo={openingTime} />
                    <ImportantMuseumInfo title="Accessability:" icon={accessibility} blockInfo={accessabilityInfo} />
                </div>
            </div>
        </div>
    )
}

export default EachMuseum