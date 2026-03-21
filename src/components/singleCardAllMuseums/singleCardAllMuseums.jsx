import {
    useCallback,
    useEffect,
    useState
}
from "react";
import { useNavigate } from 'react-router-dom';

import './singleCardAllMuseums.css'
import Button from "../../components/Tools/button/button";


const SingleCardMuseum = (museum,id,index) => {

    const navigate = useNavigate();

    useEffect(() => { 
        
    })

    function eachMuseum() {

        navigate(`/eachMuseum/${id}`)
    }



    const {firstPageImage, museumTitle, location} = museum.museum
    
    return (
        <div key={index} onClick={eachMuseum} className='singleCardMuseumWrapper' >
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