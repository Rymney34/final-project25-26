import { NavLink } from 'react-router-dom'
import './offScreen.css'
const offScreenMenu = ({isOpen, closeMenu}) =>{
    return(
        <div className={`offScreenMenu ${isOpen ? "active" : ""}`}>
            <div className='videoDiv'>
                <video className='videoDiv' autoPlay muted loop playsInline>
                    <source alt="museums video in menu" src="https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/0306(1).mp4" type="video/mp4"/>
                </video>
            </div>
            <div className='menuList'>
                <ul id='navMenu'>
                    <li><NavLink to="/home" className={({isActive}) => isActive ? "activeLink" : ""} onClick={closeMenu}>Home</NavLink></li>
                    <li><NavLink to="/addMuseum" className={({ isActive }) => isActive ? "activeLink" : ""} onClick={closeMenu}>AddMuseum</NavLink></li>
                    <li><NavLink to="/allMuseums" className={({ isActive }) => isActive ? "activeLink" : ""}  onClick={closeMenu}>All Museums</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? "activeLink" : ""}  onClick={closeMenu}>Library</NavLink></li>
                    <li><NavLink to="/chatBot" className={({ isActive }) => isActive ? "activeLink" : ""}  onClick={closeMenu}>AI Chatbot</NavLink></li>
                    <li><NavLink to="/profileSettings" className={({ isActive }) => isActive ? "activeLink" : ""}  onClick={closeMenu}>Profile Settings</NavLink></li>
                    <li><NavLink to="/recomendations" className={({ isActive }) => isActive ? "activeLink" : ""}  onClick={closeMenu}>Recomendations</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? "activeLink" : ""} onClick={closeMenu}>About & FAQs</NavLink></li>
                </ul>
            </div>
            
        
        </div>
    )
}

export default offScreenMenu