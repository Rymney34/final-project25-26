import "./fontSizeControls.css";
import Button from "../../components/Tools/button/button.jsx"
import { useEffect, useState, } from "react";


const fontSizeControls = () => {

    const API = import.meta.env.VITE_API_URL;

    const [fontSizeC, setFontSize] = useState('font-medium')
   
    const changeGlobalFontSize = (size) => {
        const root = document.documentElement;
        const sizes = {
            small: "14px",
            medium: "18px",
            huge: "32px"
        }
        const sizes2 = {
            small: "16px",
            medium: "32px",
            huge: "47px"
        }
        const sizes3 = {
            small: "35px",
            medium: "45px",
            huge: "55px"
        }


        root.style.setProperty('--app-font-size', sizes[size])
        root.style.setProperty('--header-font-size', sizes2[size])
        root.style.setProperty('--menu-font-size', sizes3[size])
    }
   
    useEffect(() => {

    }, [])

    return (
        <div className={`accessibilityWrapper ${fontSizeC}`}>
            <div className="accessiblity-toolbar">
                <h3>Text Size</h3>
                <div id="textSizeButtons" style={{display: "flex", gap: 10,margin: "10px 0 10px 0"}}>
                    <button
                        
                        className={fontSizeC === 'font-small' ? 'active' : ''}
                        onClick={() => changeGlobalFontSize('small')}
                    >
                        A
                    </button>
                    <button
                        className={fontSizeC === 'font-medium' ? 'active' : ''}
                        onClick={() => changeGlobalFontSize('medium')}
                    >
                        A
                    </button>
                    <button
                        className={fontSizeC === 'font-huge' ? 'active' : ''}
                        onClick={() => changeGlobalFontSize('huge')}
                    >
                        A+
                    </button>
                </div>
               
            </div>
        </div>
    )
}

export default fontSizeControls