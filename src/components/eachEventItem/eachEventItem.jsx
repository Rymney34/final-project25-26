import "./eachEventItem.css";
import {
    useCallback,
    useEffect,
    useState,
    useRef
} from "react";
import { handleKeyPress } from "../accessiblity/handleKeyPressed";



const eachEvent = (props, index) => {
    const props1 = props.event
    // console.log(props.event)
    return (
        <div key={index} onClick={() => handleKeyPress(window.location.href = props1.eventLink)} onKeyDown={(e) => handleKeyPress(e, () => window.location.href = props1.eventLink)} tabindex="0" className="eachEventWrapper">
            <div className="imageEventDiv">
                <img className="eventRealImage" src={props1.eventImage} alt="eventCover"/>
            </div>
            <div className="eventMainContent">
                <div className="eventTitle">
                    <h3>{props1.eventTitle}</h3>
                </div>
                <div className="eventBriefDate">
                    <p>
                        {props1.eventDate}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default eachEvent