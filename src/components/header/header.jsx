import { useState } from 'react'
import logo from '../../../resources/img/logo.png'
import OffScreenMenu from '../menu/offScreen'
import './header.css'

function Header() {
    const [count, setCount] = useState(0)
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <>
        <header>
            <div className='headerWrapper'>
                
                    <div className='navDiv'>
                        <div className='logoBlock'>
                            <a href="/home" className={({ isActive }) => isActive ? "activeLink" : ""}>
                                <img tabindex="0" className="logoClass" alt='logo' src={logo} />
                            </a>
                        </div>
                        <div className='navBlocks'>
                            <div tabindex="0" className='navMenu'>
                                <div className="menuTag" > Menu</div>
                                <nav>
                                    <div className={`ham-menu ${isOpen ? "active" : ""}`} onClick={
                                        toggleMenu
                                    }>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <OffScreenMenu isOpen={isOpen} closeMenu={()=> setIsOpen(false)} />
            </div>
            
        </header >
           
        </>                       
        
    )
}

export default Header
