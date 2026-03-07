import "./home.css";
import sliderTest from '../../../resources/img/sliderTest.png'
import location from '../../../resources/img/location_on.png'
import calendar from '../../../resources/img/calendar.png'
import planVisit from '../../../resources/img/planVisit.png'
import search from '../../../resources/img/search.png'
import SplitVisualSection from "../../components/splitSection/splitVisualSection";
import FullScreenSlider from "../../components/fullScreenSlider/fullScreenSlider";
import QuickInfoItem from "../../components/quickInfoItem/quickInfoItem";
import Spinner from "../../components/spinner/Spinner"
import { useNavigate} from "react-router-dom";

const Home = () => {

    // const [inputValue, setInputValue] = useState("");
    // const [inputData, setUserData] = useState([]);
    // const [botValue, setBotValue] = useState("");
    // const [showTitle, setShowTitle] = useState(true);
    // const [botResponse, setBotResponse] = useState([])
    // const [messages, setMessages] = useState([])
    // const [show, setShow] = useState("");
    // const chatEndRef = useRef(null);

    const images =[
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/cardiffNM.jpg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/Amgueddfa%27r_Lleng_Rhufeinig.jpeg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/snowd1.png",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/aberg.jpg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/cardiffMuseum.png",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/another.png",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/castle.png",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/coal.jpg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/maritime.png",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/meetyrCastle.jpg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/prembokeDock.jpg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/regmintalMuseum.png",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/saveimage.jpg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/swans.jpg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/tenby.jpg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/tf.jpg",
    ]

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

    return(
        <div className="homeWrapper">
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

                        // value={inputValue}
                        // onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask me anything!"
                    />
                    <button><img src={search} alt="search"/></button>
                </div>
            </div>
            <div className="discoverBlock">
                <h2>Discover Welsh Heritage</h2>
                <div className="discoverItemWrapper">
                    <QuickInfoItem img={location} title="Location" text="Browse all our museums, galleries and historic sites" btnText="Find Out More!"  />
                    <QuickInfoItem img={calendar} title="What's On" text="Find event, exhibitions and workshops near you" btnText="View Event" />
                    <QuickInfoItem img={planVisit} title="Plan Your Visit" text="Accessibility, FAQ's and museums information" btnText="Visitor Info" onClick={() => {navigate("/about")}}/>
                </div>
            </div>
            <div className="aboutWalesMuseumsWrapper">
                <div className="aboutWalesContent">
                    {/* {section.image 0 ? (
                        <SplitVisualSection sections={section} />
                    ) : (
                        <div style={{ padding: "0 150 0 0" }}>
                            <Spinner />
                        </div>

                    )} */}
                    <SplitVisualSection sections={section} />
                </div>
            </div>
        </div>
    )
}

export default Home;