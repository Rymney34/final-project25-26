import "./libraryHub.css";
import EachLibraryItem from '../../components/eachLibraryItem/eachLibraryItem.jsx'
import Spinner from "../../components/spinner/Spinner.jsx";
import {
    useCallback,
    useEffect,
    useState,
    useRef
}
    from "react";

const libraryHub = () =>{

    const API = import.meta.env.VITE_API_URL;

    const [libraryItem, setLibraryItems] = useState();
    useEffect(() => {
        const fetchLibraryItem = async () => {
            try {
                const response = await fetch(`${API}/api/getLibraries`)
                setLibraryItems(await response.json())
            } catch (err) {
                console.log("ERROR in fething Libraries", err)
            }
        }
        fetchLibraryItem()

    }, [])

    return(
        <div className="libraryHubWrapper">
            <div className="libraryHubDiv">
                <h2>Welsh Library & Tools</h2>
                <div className="toolList">
                    {!libraryItem || libraryItem.length === 0 ? (
                            <Spinner/>
                        ) :
                        libraryItem?.map((library, index) =>(
                            !library ? <Spinner key={index}/> : <EachLibraryItem library={library} index={index}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default libraryHub