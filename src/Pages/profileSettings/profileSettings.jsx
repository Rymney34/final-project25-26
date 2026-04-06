import "./profileSettings.css";
import EachEventItem from '../../components/eachEventItem/eachEventItem.jsx'
import Button from "../../components/Tools/button/button.jsx"
import { useEffect, useState, } from "react";
import { logout } from "../../components/Tools/authFront/auth.js";
import { useNavigate} from 'react-router-dom';

const profileSettings = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState([]);
    const API = import.meta.env.VITE_API_URL;
    useEffect(() =>{
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            try{
                const response = await fetch(`${API}/api/getUser`,{
                    headers: {'Authorization': `Bearer ${token}`}
                })
                const userData = await response.json();
                setFormData(userData);
            }
            catch (error){
                console.error("Auth Failed")
            }
        }
        fetchUserData();
        

    },[])

    return (
        <div className="profileSettingsWrapper">
            <div className="profileTitleDiv">
                <h2>Your Profile</h2>
                
            </div>
            <div className="mainProfileContent">
                <div className="personalDetailsBlock">
                    <p><strong> First Name:</strong> { formData.firstName}</p>
                    <p><strong> Last Name:</strong> { formData.lastName }</p>
                    <p><strong> Email:</strong> {formData.email} </p>
                </div>
                <div className="achievementsDiv">
                    <div className="achievementsTitle">
                        <h3>Your Achievements</h3>
                    </div>
                </div>
                <div className="accessibility">
                    <div className="accessibilityTitle">
                        <h3>Accessibility Settings:</h3>
                    </div>
                </div>
                <div className="logoutWrapper">
                    <Button onClick={() => logout() && navigate("/login")} style={{backgroundColor: "var(--red-color)"}} text="Logout"/>
                </div>
                
            </div>
        </div>
    )
}

export default profileSettings