import "./about.css";
import Button from "../../components/Tools/button/button"
import FullScreenSlider from "../../components/fullScreenSlider/fullScreenSlider";
import FAQSection from "../../components/fqsSection/faqSection";
import { useNavigate, useParams } from 'react-router-dom';

const About = () => {

    const navigate = useNavigate();

    const images = [
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/regmintalMuseum.png",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/saveimage.jpg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/swans.jpg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/tenby.jpg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/tf.jpg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/cardiffNM.jpg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/Amgueddfa%27r_Lleng_Rhufeinig.jpeg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/snowd1.png",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/aberg.jpg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/cardiffMuseum.png",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/another.png",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/castle.png",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/coal.jpg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/maritime.png",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/meetyrCastle.jpg",
        "https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/prembokeDock.jpg",
    ]

    return (
        <div className="aboutWrapper">
            <div className="sliderAboutWrapper">
                {images.length > 0 ? (
                    <FullScreenSlider images={images} />
                ) : (
                    <div style={{ padding: "0 150 0 0" }}>
                        <Spinner />
                    </div>

                )}
            </div>
            <div className="aboutContentDiv">
                <div className="aboutContentTitle">
                    <h2>What is Welsh Heritage</h2>
                </div>
                <div className="aboutContentInfo">
                    <p> Welsh Heritage Hub is a place where you can discover and explore heritage sites across Wales, such as Cardiff National Museum, Roman Legion Museum in Newport, etc.
                        You can visit these places in person or explore them digitally online. The hub brings together history, culture and stories from all parts of Wales, making it easy for everyone to learn about Welsh heritage in an
                        enjoyable and accessible way. It is designed for residents, visitors, students and researchers who want to connect with Wales’s rich past and living culture.
                    </p>
                </div>
            </div>
            <div className="exploreWithAIDiv">
                <div className="aboutAITitle">
                    <h2>Explore Wales With AI</h2>
                </div>
                <div className="AIDivContent">
                    <div className="leftAiDiv">
                        <p>You could ask AI to recomend you what would be better place for you to visit today based on your mood and feelings, and much more all you need is to chat with it!</p>
                        <Button text="Find Out More!" onClick={() =>  navigate("/recomendations") } style={{ backgroundColor: "var(--red-color)", color: "white", width: "300px"}}/>
                    </div>
                    <div className="rightAIDiv">
                        <video className="rightVideo" src='https://museums-welsh-heritage-bucket.s3.eu-north-1.amazonaws.com/general-content/0412.mp4' autoPlay muted loop playsInline>

                        </video>
                    </div>
                </div>
            </div>
            <div className="faqSection">
                <FAQSection/>
            </div>
        </div>
    )
}

export default About