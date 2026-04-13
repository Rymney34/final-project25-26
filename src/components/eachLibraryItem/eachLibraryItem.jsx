import "./eachLibraryItem.css";
import { handleKeyPress } from "../accessiblity/handleKeyPressed";


const eachLibraryItem = (props, index) => {
    
    const props2 = props.library
    console.log(props2)
    return (
        <div onClick={() => handleKeyPress(window.location.href = props2.libraryLink)} onKeyDown={(e) => handleKeyPress(e, () => window.location.href = props2.libraryLink )} key={index} tabindex="0" className="eachLibraryWrapper">
            <div className="imageLibraryDiv">
                <img className="libraryRealImage" src={props2.libraryImage} alt="libraryCover"/>
            </div>
            <div className="libraryMainContent">
                <div className="libraryTitle">
                    <h3>{props2.libraryTitle}</h3>
                </div>
                <div className="libraryBriefDescription">
                    <p>
                        {props2.libraryDescription}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default eachLibraryItem