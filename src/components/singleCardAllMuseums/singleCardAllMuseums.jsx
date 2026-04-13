import {
    useCallback,
    useEffect,
    useState
}
from "react";
import { useNavigate, useParams } from 'react-router-dom';

import './singleCardAllMuseums.css'
import Button from "../../components/Tools/button/button";
import { handleKeyPress } from "../accessiblity/handleKeyPressed";


const SingleCardMuseum = (museum,index) => {

    const navigate = useNavigate();
    useEffect(() => { 
        
    })

    function eachMuseum(id) {

        navigate(`/eachMuseum/${id}`)
    }
    //accesibility feature so user could open museum by click enter on the keyboard
   

    const {firstPageImage, museumTitle, location, _id} = museum.museum

    return (
        <div tabIndex='0' key={index} onClick={() => handleKeyPress(eachMuseum(_id))}  onKeyDown={(e) => handleKeyPress(e, ()=> eachMuseum(_id))} className='singleCardMuseumWrapper' >
            <div className="singleCardMuseumContent" >
                <div className="eachMuseumImageDiv">   
                    <img src={firstPageImage} className="eachMuseumImage" alt="museum Image" />
                </div>
                
                <div className="cardContent">
                    <div>
                        <h3>{museumTitle}</h3>
                    </div>
                    <div className="h4Location">   
                        <h4>Location: {location}</h4>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default SingleCardMuseum 