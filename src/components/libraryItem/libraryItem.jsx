import "./libraryItem.css";


const LibraryItem = (props, index) => {

    props = {title, image, text, link}
    return (
        <div tabIndex="0" key ={index} onClick={()=> window.open({link})} className="libraryItemWrapper">
            <div className="libraryItem">
                <img className="libraryImage" src={image} alt="library Image" />
                <div className="itemContent">
                    <div className="itemTitle">
                        <h2>{title}</h2>
                    </div>
                    <div className="paragraphDiv">
                        <p>{text}</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default LibraryItem