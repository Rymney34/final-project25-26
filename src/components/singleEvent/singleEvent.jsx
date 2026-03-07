import "./singleEvent.css";


const SingleEvent = (props, index) => {

    props = {image, title, time, weekDays, date, link}
    return (
 
        <div tabIndex="0"  key={index} onClick={() => window.open({ link })} className="eventDiv">
            <img className="eventImage" alt="image of the Event" src={image}/>
            <div className="eventContent">
                <div className="eventTitle">
                    <h2>{title}</h2>
                </div>
                <dl className="eventInfo">
                    <dt>Time:</dt>
                    <dd><time datetime={time}>{time}</time>{weekDays}</dd>

                    <dt>Date:</dt>
                    <dd><time datetime={date}>{date}</time></dd>
                </dl>
            </div>
            
            
        </div>
       
    )
}

export default SingleEvent