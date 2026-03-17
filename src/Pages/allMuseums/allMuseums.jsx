import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import './allMuseums.css'
import Button from "../../components/Tools/button/button";
import SingleCardMuseum from "../../components/singleCardAllMuseums/singleCardAllMuseums";



const AllMuseums = () => {

    const {museumsData, setMuseumsData} = useState();
    useEffect(() => {
        const fetchMuseums = async () => {
            try{
                const response = await axios.get("/api/getAllMuseums");

                setMuseumsData(response.data)
            }catch(error){
                console.log('Error in fetching', error)
            }
        }
        fetchMuseums()
    },[])

    return (
        <div className='eachMuseumWrapper'>
            <div className="allMusuemsDisplay">
                {museums.map((museum, index)=>{
                    <SingleCardMuseum index={index} museum={museum}/>
                }

                )}
                    
            </div>
            <div>
                <Button text="Load More"/>
            </div>
        </div>
    )
}

export default AllMuseums