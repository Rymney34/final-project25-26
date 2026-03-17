import {
    useCallback,
    useEffect,
    useState
}
from "react";

import './singleCardMuseum .css'
import Button from "../../components/Tools/button/button";


const SingleCardMuseum = (museum,index) => {
    useEffect(() => { 
        
    })

    const {image, museumTitle, location} = museum
    
    return (
        <div key={index} className='singleCardMuseumWrapper' >
            <div className="singleCardMuseumContent" >
                <img src={image} className="eachMuseumImage" alt="museum Image"/>
                <div className="cardContent">
                    <h2>{museumTitle}</h2>
                    <h3>Location:{location}</h3>
                </div>
            </div>
            
        </div>
    )
}

export default SingleCardMuseum 