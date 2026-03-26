import "./eachLibraryItem.css";


const eachLibraryItem = (props, index) => {
    return (
        <div key={index} tabindex="0" className="eachLibraryWrapper">
            <div className="imageLibraryDiv">
                <img className="libraryRealImage" src={props.eventImage} alt="libraryCover"/>
            </div>
            <div className="libraryMainContent">
                <div className="libraryTitle">
                    <h3>{props.title}</h3>
                </div>
                <div className="libraryBriefDescription">
                    <p>
                        {props.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default eachLibraryItem