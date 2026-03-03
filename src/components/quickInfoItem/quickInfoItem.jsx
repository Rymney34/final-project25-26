import "./quickInfoItem.css";
import { Link } from "react-router-dom";
import Button from "../Tools/button/button";

function quickInfoItem(props) {

    return (
        <div className="itemBlockWrapper">
            <div className="infoItem">
                <img src={props.img} alt={props.title}/>
                <h4>{props.title}</h4>
                <p>{props.text}</p>
                <Button text={props.btnText} style={{backgroundColor: "white", color: 'black'}}/>
            </div>
        </div>
    );
}

export default quickInfoItem;
