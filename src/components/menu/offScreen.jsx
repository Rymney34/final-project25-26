import './offScreen.css'
const offScreenMenu = ({isOpen}) =>{
    return(
        <div className={`offScreenMenu ${isOpen ? "active" : ""}`}>
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
    )
}

export default offScreenMenu