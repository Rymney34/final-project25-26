import { useCallback, useEffect, useState } from "react";

import './eachMuseum.css'
import location from '../../../resources/img/location_on.png'
import calendar from '../../../resources/img/calendar.png'
import planVisit from '../../../resources/img/planVisit.png'
import phone from '../../../resources/img/phone.png'
import accessability from '../../../resources/img/accessability.png'
import QuickInfoItem from '../../components/quickInfoItem/quickInfoItem'
import { ImportantMuseumInfo } from '../../components/importantMuseumInfo/importantMuseumInfo'
import EachMuseumSlider from '../../components/eachMuseumSlider/eachMuseumSlider'


const EachMuseum = () => {

    useEffect(() => {
        
    })

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
                                Usually{openingTime}

                            </p>
                        </div>
                        <div className='locationInfo'>
                            <h3 className='locationTitle'>Location:</h3>
                            <address className='museumAddress'>
                                {location}
                            </address>
                        </div>
                    </div>
                </div>
            </div>
            <div className='planYourVisitWrapper'>
                <QuickInfoItem img={location} title="Location" text="Browse all our museums, galleries and historic sites" btnText="Find Out More!" />
                <QuickInfoItem img={calendar} title="What's On" text="Find event, exhibitions and workshops near you" btnText="View Event" />
                <QuickInfoItem img={planVisit} title="Plan Your Visit" text="Accessibility, FAQ's and museums information" btnText="Visitor Info" onClick={() => { navigate("/about") }} />
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
                    {virtoulTours.map((tour,i) => {
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
                    <h2>Contact{museumTitle}</h2>
                </div>

                <div className='leftMuseumImportantBlock'>
                    <ImportantMuseumInfo title="Our location:" icon={location} blockInfo={location}/>
                    <ImportantMuseumInfo title="Contact Us:" icon={phone} blockInfo={contactInfo}/>
                </div>
                <div className='rightMuseumImportantBlock'>
                    <div className='museumMapLocationWrapper'>
                        <map>

                        </map>
                    </div>
                    
                </div>
                <div className='bottomMuseumImportantBlock'>
                    <ImportantMuseumInfo title="Opening Hours:" icon={time} blockInfo={openingTime} />
                    <ImportantMuseumInfo title="Accessability:" icon={accessability} blockInfo={accessabilityInfo} />
                </div>
            </div>
        </div>
    )
}

export default EachMuseum