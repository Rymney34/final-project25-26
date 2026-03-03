
import {useState, useEffect} from "react";
import "./fullScreenSlider.css";

const FullScreenSlider = ({images, autoSlide = true, slideInterval=5000}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide =() =>{
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev -1
        );
    };

    useEffect(() => {
        if(!autoSlide) return;
        const interval = setInterval(nextSlide, slideInterval);
        return () => clearInterval (interval);

    },[currentIndex, autoSlide]);

    return(
        <div className="slider">
            <div 
                className="sliderTrack"
                style={{transform: `translateX(-${currentIndex * 100}vw)`}}
            >
                {images.map((img, index) => {
                    return(
                        <div
                            className="slide"
                            key={index}
                            style={{ backgroundImage: `url(${img})` }}
                        />
                    )
                })}
            </div>
            <button className="arrow left" onClick={prevSlide}>
                ←
            </button>
            <button className="arrow right" onClick={nextSlide}>
                →
            </button>
        </div>
    )
}
export default FullScreenSlider