import './offScreen.css'
const offScreenMenu = ({isOpen}) =>{
    return(
        <div className={`offScreenMenu ${isOpen ? "active" : ""}`}>
            <ul>
                <li>Home</li>
                <li>Library</li>
                <li>Chatbot</li>
                <li>About</li>
            </ul>
        
        </div>
    )
}

export default offScreenMenu