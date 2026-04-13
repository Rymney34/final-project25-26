import './modals.css'
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import Button from '../button/button';
const LoginModal = ({ isOpen, onClose }) => { 
    console.log("isOpen",isOpen)
    const navigate = useNavigate(); 

    if (!isOpen) return null; 

    return (
        
        <div className="modalOverlay" onClick={onClose}> 
        
            <div className="modalBox" 
                onClick={(e) => e.stopPropagation()}> 
                    <h3 style={{ margin: '0 0 15px 0', color: 'black'}}>
                    Please Login
                    </h3> 
                    <p style={{ fontSize: '14px', color: 'black' }}> You need an account to access this feature. </p> 
                    <div style={{ marginTop: '25px', display: 'flex', gap: '10px', alignItems: 'center' , justifyContent: "center"}}> 
                        <Button onClick={() => navigate('/login')} style={{backgroundColor: 'green'}} text="Login" />
                    <Button onClick={onClose} text="Close" style={{ backgroundColor: 'var(--red-color)' }} />
                    </div> 
            </div> 
        </div>
    ); 
};

export default LoginModal