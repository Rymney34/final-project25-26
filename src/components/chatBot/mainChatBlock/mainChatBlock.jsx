import { useEffect, useState, useRef } from 'react';
import Button from "../../Tools/button/button";


import "./mainChatBlock.css";


// Main Chatbot funciton 
const mainChatBot = () =>{

    const [inputValue, setInputValue] = useState("");
    const [inputData ,setUserData] = useState([]);
    const [botValue, setBotValue] = useState("");
    const [showTitle, setShowTitle] = useState(true);
    const [botResponse, setBotResponse] = useState([])
    const [messages, setMessages] = useState([])
    const [show, setShow] = useState("");
    const chatEndRef = useRef(null);
    // const API = import.meta.env.VITE_API_URL;;

    // console.log(API)
    // useEffect(() => {
    //     fetch(`${API}/api/test`)
    //         .then(res => res.json())
    //         .then(data => console.log(data));


    // }, []);

   
    
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

        const handleSubmit = async () => {

            const userPrompt = inputValue;

            setUserData(prev => [...prev, userPrompt]);
            setInputValue(""); 

            const API = import.meta.env.VITE_API_URL;;
            try {
                const response = await fetch(`${API}/api/getChat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: userPrompt, history: [] }),
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
                // Handle errors gracefully, e.g., display an error message to the user
            }
        }
    
    const ChatHistory = () => {

        return (
            <>
                <div className="user-message">{inputValue}</div>
                <div className="bot-message">{botResponse}</div>
            </>
        )
    }
  
    const handleSend = () => {
        console.log(botValue)
        if (inputValue.trim() !== "") {
            handleSubmit()
            setShowTitle(false)
        }
    };

   

   


    return(
        <div className="chatBotWrapper">
            <div className="chatBotBlock">
                <div className='titleWrapperChat'>
                    {showTitle ? <div class="titleContainerAnimation">
                        <p class="titleText" >Ask me anything!</p>
                    </div>
                        : <></>}
                </div>
                
                    
                    <div className="mainChatBlock">
                   
                    
                        {/* {inputData.map((message, index) => (
                            <div key={`user-${index}`} className="user-message">{message}</div>
                            
                        ))}
                        {botResponse.map((response, index) => (
                            <div className="botResWrapper">
                                <div key={`bot-${index}`} className="bot-message">{response}</div>
                            </div>
                        
                        ))} */}
                        {messages.map((msg, index) => (
                            <div key={index} className={`message-wrapper ${msg.sender}`}>
                                <div className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />

                    </div>
                    
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSend
                }}>
                    <div className="inputSearchDiv">
                        <input type="text" 
                        className="promptInput" 
                        id="prompt"
                        
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type a prompt..."
                        />
                    <Button type="submit" onClick={handleSend} text="Send" style={{ width: 113, height: 53, backgroundColor: "#82181A", borderRadius: 25}}  />
                    </div>
                </form> 
            </div>
        </div>
    )
}

export default mainChatBot