import {
    useCallback,
    useEffect,
    useState
}
from "react";

import './singleCardAllMuseums.css'
import Button from "../../components/Tools/button/button";


const SingleCardMuseum = (museum,index) => {
    useEffect(() => { 
        
    })


    const {firstPageImage, museumTitle, location} = museum.museum
    
    return (
        <div key={index} className='singleCardMuseumWrapper' >
            <div className="singleCardMuseumContent" >
                <img src={firstPageImage} className="eachMuseumImage" alt="museum Image"/>
                <div className="cardContent">
                    <h3>{museumTitle}</h3>
                    <h4>Location:{location}</h4>
                </div>
            </div>
            
        </div>
    )
}

export default SingleCardMuseum 