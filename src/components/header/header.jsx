import { useState } from 'react'
import logo from '../../../resources/img/logo.png'
import OffScreenMenu from '../menu/offScreen'
import { useNavigate, useParams } from 'react-router-dom';
import './header.css'
import { handleKeyPress } from "../accessiblity/handleKeyPressed";
import { NavLink } from 'react-router-dom'

function Header() {
    const [count, setCount] = useState(0)
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <>
        <header>
            <div className='headerWrapper'>
                
                    <div className='navDiv'>
                        <div className='logoBlock'>
                            <NavLink to="/home" className={({ isActive }) => isActive ? "activeLink" : ""}  onKeyDown={(e) => handleKeyPress(e,()=> navigate("/home"))}>
                                <img className="logoClass" alt='logo' src={logo} />
                            </NavLink>
                        </div>
                        <div className='navBlocks'>
                            <div  className='navMenu'>
                                <div className="menuTag" > Menu</div>
                                <nav>
                                    <div tabIndex="0" className={`ham-menu ${isOpen ? "active" : ""}`} onClick={
                                       
                                        toggleMenu
                                    }
                                        onKeyDown={(e) => handleKeyPress(e, toggleMenu)}
                                    >
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                    {!isOpen ? <></> : <OffScreenMenu isOpen={isOpen} closeMenu={() => setIsOpen(false)} /> }
                    
            </div>
            
        </header >
           
        </>                       
        
    )
}

export default Header
