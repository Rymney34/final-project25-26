import "./profileSettings.css";
import EachEventItem from '../../components/eachEventItem/eachEventItem.jsx'
import Button from "../../components/Tools/button/button.jsx"

const profileSettings = (props) => {
    return (
        <div className="profileSettingsWrapper">
            <div className="profileTitleDiv">
                <h2>Your Profile</h2>
                
            </div>
            <div className="mainProfileContent">
                <div className="personalDetailsBlock">
                    <p><strong> First Name:</strong>{}</p>
                    <p><strong> Last Name:</strong>{ }</p>
                    <p><strong> Email:</strong>{ }</p>
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
                    <Button text="Logout"/>
                </div>
                
            </div>
        </div>
    )
}

export default profileSettings