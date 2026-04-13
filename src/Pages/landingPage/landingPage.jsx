
import sliderTest from '../../../resources/img/sliderTest.png'
import location from '../../../resources/img/location_on.png'
import calendar from '../../../resources/img/calendar.png'
import planVisit from '../../../resources/img/planVisit.png'
import search from '../../../resources/img/search.png'
import SplitVisualSection from "../../components/splitSection/splitVisualSection";
import FullScreenSlider from "../../components/fullScreenSlider/fullScreenSlider";
import QuickInfoItem from "../../components/quickInfoItem/quickInfoItem";
import Spinner from "../../components/spinner/Spinner";
import { useNavigate, useParams } from 'react-router-dom';
import {images} from '../../components/Tools/data.js'
import { useCallback, useEffect, useState } from "react";
import LoginModal from '../../components/Tools/modals/modals.jsx'
import Button from "../../components/Tools/button/button.jsx";
import { NavLink } from "react-router-dom";
import logo from '../../../resources/img/logo.png'

const LandingPage = () => {

    const [inputValue, setInputValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const section = [
        
            {
                
                title: "Museums in Wales",
                image: "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/Amgueddfa%27r_Lleng_Rhufeinig.jpeg",
                paragraphs:[
                    "Wales is home to a world-class network of museums that celebrate everything from fine art to the Industrial Revolution. Most notably, the seven national museums operate under Amgueddfa Cymru (Museum Wales) and offer free entry.",
                ],
                linkText: "nothing"
            },
            {
                imagePosition:"left",
                title: "Wales: Land of Myth, Song, and Industry",
                image:  "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/snowd1.png",
                paragraphs: [
                    "Wales has many museums that show off its long history of Myth, Song, and Industry. You can visit the National Museum in Cardiff to see ancient treasures or go deep underground at Big Pit to see how coal miners used to work. These places keep the stories of the Welsh people alive for everyone to see today."
                ],
                linkText: "nothing"
            }
    ]

    const navigate = useNavigate();

    useEffect(() => {
        if(isModalOpen){
            document.body.style.overflow='hidden';
        }
        else{
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
        
    },[isModalOpen])

    return(
        <div className="homeWrapper">
            <header>
                <div className='headerWrapper'>
                    <div className='navDiv'>
                        <div className='logoBlock'>
                            <NavLink href="/landingPage" className={({ isActive }) => isActive ? "activeLink" : ""}>
                                <img className="logoClass" alt='logo' src={logo} />
                            </NavLink>
                        </div>
                        <Button style={{ backgroundColor: "green" , width: 120 , height: 50 }} text="Login" onClick={() => navigate("/login")} />
                    </div>
                    
                </div>
            </header >
            <div className="sliderWrapper">
                {images.length > 0 ? (
                    <FullScreenSlider images={images} />
                ) : (
                    <div style={{ padding: "0 150 0 0" }}> 
                            <Spinner  />
                    </div>
                )}
            </div>
            <div className="aiBlockWrapper">
                <h1>Explore Welsh Culture With AI</h1>
                <div className="aiBlock">
                    <input type="text"
                        className="aiInput"
                        id="prompt"
                        placeholder="Ask me anything!"
                    />
                    <button onClick={() => {setIsModalOpen(true)}}><img src={search} alt="search"/></button>
                </div>
            </div>
            <div className="discoverBlock">
                <h2>Discover Welsh Heritage</h2>
                <div className="discoverItemWrapper">
                    <QuickInfoItem img={location} title="Location" text="Browse all our museums, galleries and historic sites" btnText="Find Out More!" onClick={() => setIsModalOpen(true)} />
                    <QuickInfoItem img={calendar} title="What's On" text="Find event, exhibitions and workshops near you" btnText="View Events" onClick={() => setIsModalOpen(true)} />
                    <QuickInfoItem img={planVisit} title="Plan Your Visit" text="Accessibility, FAQ's and museums information" btnText="Visitor Info" onClick={() => setIsModalOpen(true)}/>
                </div>
            </div>
            <div className="aboutWalesMuseumsWrapper">
                <div className="aboutWalesContent">
                    <SplitVisualSection sections={section} />
                </div>
            </div>
            <LoginModal 
            isOpen={isModalOpen}
            onClose={()=> setIsModalOpen(false)}
            />
        </div>
    )
}

export default LandingPage;