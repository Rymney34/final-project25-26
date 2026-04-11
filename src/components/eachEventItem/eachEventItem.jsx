import "./eachEventItem.css";
import {
    useCallback,
    useEffect,
    useState,
    useRef
}
    from "react";


const eachEvent = (props, index) => {
    return (
        <div key={index} tabindex="0" className="eachEventWrapper">
            <div className="imageEventDiv">
                <img className="eventRealImage" src={props.eventImage} alt="eventCover"/>
            </div>
            <div className="eventMainContent">
                <div className="eventTitle">
                    <h3>{props.title}</h3>
                </div>
                <div className="eventBriefDate">
                    <p>
                        {props.date}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default eachEvent