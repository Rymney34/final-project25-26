import "./home.css";
import sliderTest from '../../../resources/img/sliderTest.png'
import location from '../../../resources/img/location_on.png'
import calendar from '../../../resources/img/calendar.png'
import planVisit from '../../../resources/img/planVisit.png'
import search from '../../../resources/img/search.png'
import SplitVisualSection from "../../components/splitSection/splitVisualSection";
import FullScreenSlider from "../../components/fullScreenSlider/fullScreenSlider";
import QuickInfoItem from "../../components/quickInfoItem/quickInfoItem";

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
        sliderTest,
        sliderTest,
        sliderTest,
    ]

    return(
        <div className="homeWrapper">
            <div className="sliderWrapper">
                <FullScreenSlider images={images}/>
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
                    <QuickInfoItem img={planVisit} title="Plan Your Visit" text="Accessibility, FAQ's and museums information" btnText="Visitor Info" />
                </div>
            </div>
            <div className="aboutWalesMuseumsWrapper">
                <div className="aboutWalesContent">

                </div>
            </div>
        </div>
    )
}

export default Home;