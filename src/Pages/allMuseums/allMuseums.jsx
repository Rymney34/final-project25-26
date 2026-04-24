import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './allMuseums.css'
import Button from "../../components/Tools/button/button";
import SingleCardMuseum from "../../components/singleCardAllMuseums/singleCardAllMuseums";
import Spinner from "../../components/spinner/Spinner";
const API = import.meta.env.VITE_API_URL;

const AllMuseums = () => {
    const [museumsData, setMuseumsData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    
    const fetchMuseums = async (pageNum) => {
        try {
            const response = await axios.get(`${API}/api/getAllMuseums?page=${pageNum}&limit=8`);
            // console.log(response)
            const newData = response.data.result;
            setMuseumsData(prev => {const filteredData = newData.filter(newItem => 
                !prev.some(oldItem => oldItem._id === newItem._id)
            )
            return [...prev, ...filteredData]
            })
            setHasMore(response.data.hasMore);
        } catch (error) {
            console.log('Error in fetching', error)
        }
    }
    useEffect(() => {
        
        fetchMuseums(1)
    },[])
    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMuseums(nextPage)
    }
    return (
        <div className='eachMuseumWrapper'>
            <div className="allMusuemsDisplay">
                {museumsData.length > 0 ? (
                    museumsData.map((museum, index)=> (
                        <SingleCardMuseum index={index} museum={museum}/>
                    ))
                ) : (
                    <Spinner/>
                )}
            </div>
            <div style={{margin: "20px 0px 20px 0px"}}>
                {hasMore&& (
                    <Button text="Load More" onClick={loadMore} style={{ backgroundColor: "var(--red-color)" }} />
                )}
            </div>
        </div>
    )
}

export default AllMuseums