import './offScreen.css'
const offScreenMenu = ({isOpen}) =>{
    return(
        <div className={`offScreenMenu ${isOpen ? "active" : ""}`}>
            <div className='videoDiv'>
                <video className='videoDiv' autoPlay muted loop playsInline>
                    <source alt="museums video in menu" src="https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/0306(1).mp4" type="video/mp4"/>
                </video>
            </div>
            <div className='menuList'>
                <ul>
                    <li>Home</li>
                    <li>All Museums</li>
                    <li>Library</li>
                    <li>AI Chatbot</li>
                    <li>Profile Settings</li>
                    <li>Recomendaitons</li>
                    <li>About</li>
                </ul>
            </div>
            
        
        </div>
    )
}

export default offScreenMenu