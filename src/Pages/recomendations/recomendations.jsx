import Button from "../../components/Tools/button/button"
import FullScreenSlider from "../../components/fullScreenSlider/fullScreenSlider"
import { useNavigate, useParams } from 'react-router-dom';
import { images } from '../../components/Tools/data.js'
import "../recomendations/recomendations.css"

const recomendations = () => {

    const navigate = useNavigate()
return (
    <div className="recomendationsWrapper">
        <div className="recomendaitonMainContent">
            <div className="recomendationTitle">
                <h2>Recomendations</h2>
            </div>
                <div className="mainRecomendationContent">
                    <p>
                        Not sure where to start? Ask our AI guide for custom plan based on your interests or needs.
                    </p>
                    <div className="recExamples">
                        <h2>Try asking</h2>
                        <ul>
                            <li>"I only have 30 minutes, what should I visit?"</li>
                            <li>"Which exhibits are best for someone using a wheelchair"</li>
                            <li>"I want relaxed and quite atmosphere, where should I go?"</li>
                        <li>"Tell our Heritage Bot exactly what you need—whether it’s a quiet route or accessible exhibits. Honest input helps us provide the most comfortable experience for you."</li>
                        </ul>
                    </div>
                    <Button onClick={()=> navigate('/chatBot')} style={{height: "120px", background: "var(--red-color)"}} text="Explore all recomendation with AI !" />
                </div>
        </div>
        
        <div className="recomendationSlider">
            <FullScreenSlider images={images} />
        </div>
    </div>
)
}

export default recomendations