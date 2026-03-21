import {
    useCallback,
    useEffect,
    useState
}
from "react";
import { useNavigate, useParams } from 'react-router-dom';

import './singleCardAllMuseums.css'
import Button from "../../components/Tools/button/button";


const SingleCardMuseum = (museum,index) => {

    const navigate = useNavigate();

 

    useEffect(() => { 
        
    })

    function eachMuseum(id) {

        navigate(`/eachMuseum/${id}`)
    }



    const {firstPageImage, museumTitle, location, _id} = museum.museum
        
    console.log(_id)

    
    return (
        <div key={index} onClick={() => eachMuseum(_id)} className='singleCardMuseumWrapper' >
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