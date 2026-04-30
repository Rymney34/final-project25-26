import "./allEvents.css";
import EachEventItem from '../../components/eachEventItem/eachEventItem.jsx'
import Spinner from "../../components/spinner/Spinner.jsx";
import {
    useCallback,
    useEffect,
    useState,
    useRef
}
    from "react";

const allEvents = () => {
    const API = import.meta.env.VITE_API_URL || "";

    const [events, setEvents] = useState();
    useEffect(() => {
        const fetchEvents = async () => {
            try{
                const response = await fetch(`${API}/api/getEvents`)
                setEvents(await response.json())
            }catch(err){
                console.log("ERROR in fething Events", err)
            }
        }
        fetchEvents()

    }, [])
    return (
        <div className="allEventsWrapper">
            <div className="allEventsDiv">
                <h2>All Events</h2>
                <div className="eventsList">
                    {!events || events.length === 0 ? (
                        <Spinner/> 
                    ) : (
                        events.map((event, index) => (
                            // <EachEventItem event={event} index={index} />
                            !event ? <Spinner key={index} /> : <EachEventItem event={event} index={index} /> 
                            // <EachEventItem event={event} index={index}/>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default allEvents