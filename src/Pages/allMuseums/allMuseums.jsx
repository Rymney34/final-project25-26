import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './allMuseums.css'
import Button from "../../components/Tools/button/button";
import SingleCardMuseum from "../../components/singleCardAllMuseums/singleCardAllMuseums";
import Spinner from "../../components/spinner/Spinner";

const API = import.meta.env.VITE_API_URL;;

const AllMuseums = () => {

    const [museumsData, setMuseumsData] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchMuseums = async () => {
            try{
                const response = await axios.get(`${API}/api/getAllMuseums`);

                setMuseumsData(response.data)
            }catch(error){
                console.log('Error in fetching', error)
            }
        }
        fetchMuseums()
    },[])

   
    

    console.log(museumsData);

    return (
        <div className='eachMuseumWrapper'>
            <div className="allMusuemsDisplay">
                {museumsData.length > 0 ? (
                    museumsData.map((museum, index)=> (
                
                        <SingleCardMuseum index={index} id={museum.id} museum={museum}/>
                              
                    ))
                ) : (
                    <Spinner/>
                )}
                
                    
            </div>
            <div style={{margin: "20px 0px 20px 0px"}}>
                <Button text="Load More" style={{ backgroundColor: "var(--red-color)"}}/>
            </div>
        </div>
    )
}

export default AllMuseums