import {
    useCallback,
    useEffect,
    useState,
    useRef
}
    from "react";
import { useNavigate, useParams } from 'react-router-dom';

import './miniChatBot.css'
import Button from "../../components/Tools/button/button";
import floatingIcon from '../../../resources/img/floatingIcon.png'


const miniChatBot = () => {

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const [inputData ,setUserData] = useState([]);
    const [botValue, setBotValue] = useState("");
    const [messages, setMessages] = useState([])
    const [show, setShow] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const chatEndRef = useRef(null);

    useEffect(() => {
        // scroll down when user add message to array 
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        //to show popup message
        if(isOpen && messages.length === 0){
            const timer = setTimeout(() => {
                const greeting = {
                    text: "Hi! I'm your Welsh Heritage Assistant. How can I help you today?",
                    sender: 'bot'
                };
                setMessages([greeting])
            }, 500);
            return () => clearTimeout(timer);
        }
    },[messages,isOpen])

    //getting user and bot cahting history - previous texts 
    const getHistory = () => {
        return messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }))
    }

    const toggleChat = () =>{
        setIsOpen(!isOpen);
        setShowHint(false);
    }
    // sending user input to the backend
    const handleSubmit = async () => {

        const userPrompt = inputValue;

        setUserData(prev => [...prev, userPrompt]);
        setInputValue("");

        const API = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(`${API}/api/getChat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userPrompt, history: getHistory() }),
            });

            const data = await response.json();
            console.log(data)
            const botMessage = data.data;
            console.log(botMessage)

            const userMsg = { text: userPrompt, sender: 'user' };
            setMessages(prev => [...prev, userMsg]);

            // Simulate/Fetch Bot Response
            const botMsg = { text: botMessage, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
            // setBotResponse(prevRes => [...prevRes, botMessage])

        } catch (error) {
            console.error('Error:', error);
        }
    }
    // hanlesend input value 
    const handleSend = () => {
        console.log(botValue)
        if (inputValue.trim() !== "") {
            handleSubmit()
        }
    };

    return (
        <div className="chatContainer">
            {showHint  && !isOpen && (
                <div className="ai-hint-popup">
                    <button className="close-hint" onClick={() => setShowHint(false)}>x</button>
                    <p>I’m here to help — if you’d like any recommendation or advice, just let me know</p>
                </div>
            )}
            {isOpen && (
                <div className='miniChatbotWrapper' >
                    <div className="headerMiniChatBlock">
                        <div style={{margin: 20}}> </div>
                        <p className="miniTitleText">Ask me anything!</p>
                        <button style={{color: "white", right: 20, backgroundColor:"var(--red-color)"}} onClick={() => setIsOpen(false)}>X</button>
                    </div>
                    <div className="mainChatbotSection">
                        <div className="mainChatBotContent">
                            {messages.map((msg, index) => (
                                <div key={index} className={`mini-message-wrapper ${msg.sender}`}>
                                    <div className={msg.sender === 'user' ? 'mini-user-message' : 'mini-bot-message'}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                        <div className="inputSearchMiniDiv">
                            <input type="text"
                                className="miniPromptInput"
                                id="prompt"

                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type a prompt..."
                            />
                            <Button 
                                type="submit" 
                                onClick={handleSend} 
                                text="Send" 
                                style={{ width: 93,  margin: 0, backgroundColor: "#82181A", borderRadius: 25}}  
                            />
                        </div>
                    </div>
                </div>
            )}
            <div 
                tabIndex="1"
                className={`chat-toggle-btn ${isOpen ? 'active' : '' }`}
                onClick = {() => setIsOpen(!isOpen)}
            >
                <img className='miniAIChatBotIcon' src={floatingIcon} alt="AI mini chatbot icon"/>
            </div>
        </div>
    )
}

export default miniChatBot