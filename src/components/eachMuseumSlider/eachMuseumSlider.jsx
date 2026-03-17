import { useCallback, useEffect, useState } from "react";

import "./eachMuseumSlider.css";

const EachMuseumSlider = ({slides}) =>{

    const [currentSlide, setCurrentSlide] = useState(0);

    if(!slides || slides.length === 0){
        return <p>No slides are uploaded for this museum sorry</p>
    }

    const nextSlide = useCallback(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prevSlide) =>
            (prevSlide === 0 ? slides.length - 1 : prevSlide -1)
        )
    },[slides.length])

    useEffect(()=> {
        const handleKeyPress = (e) => {
            if(e.key === "ArrowLeft") prevSlide();
            if(e.key === "ArrowRight") nextSlide();
        }
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    },[nextSlide, prevSlide])

    const {slideImage, slideTitle, slideText} = slides[currentSlide];

    return (
        <div aria-roledescription="carousel" aria-label="Exhibit Gallery" className="sliderMuseumContainer" aria-live="polite">
            <div className="sliderMuseumContent">
                <div className="textSection">
                    <h2>{slideTitle}</h2>
                    <p>{slideText}</p>
                </div>
                <div className="imageSection">
                    <img src={slideImage} alt={slideTitle} className="sliderContentImage"/>
                </div>
            </div>
            <div className="sliderControls">
                <button onclick={prevSlide} className="prev-button" aria-label="Previous Slide">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24"
                        className="arrow-icon"
                    >
                        <path fill="#000000" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z" />
                    </svg>
                </button>
                <button onclick={nextSlide} className="next-button" aria-label="Next Slide">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24"
                        height="24" 
                        viewBox="0 0 24 24"
                        className="arrow-icon"
                    >
                        <path fill="#000000" d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default EachMuseumSlider;