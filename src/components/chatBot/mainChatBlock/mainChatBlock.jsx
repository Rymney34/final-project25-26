import "./mainChatBlock.css";
import Button from "../../Tools/button/button";
import { Component, useEffect, useState } from 'react';
import Spinner from "../../spinner/Spinner";


// Main Chatbot funciton 
const mainChatBot = () =>{

    const [inputValue, setInputValue] = useState("");
    const [inputData ,setUserData] = useState([]);
    const [botValue, setBotValue] = useState("");
    const [botResponse, setBotResponse] = useState([])
    const [show, setShow] = useState("");
    
    // const API = import.meta.env.VITE_API_URL;;

    // console.log(API)
    // useEffect(() => {
    //     fetch(`${API}/api/test`)
    //         .then(res => res.json())
    //         .then(data => console.log(data));


    // }, []);


    
    useEffect(() =>{
        
    })
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
               
                setBotResponse(prevRes => [...prevRes, botMessage])
               
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
        }
    };

   


    return(
        <div className="chatBotWrapper">
            <div className="chatBotBlock">
                    <div className="mainChatBlock">
                   
                    
                    {inputData.map((message, index) => (
                        <div key={`user-${index}`} className="user-message">{message}</div>
                    ))}
                    {botResponse.map((response, index) => (
                        <div className="botResWrapper">
                            <div key={`bot-${index}`} className="bot-message">{response}</div>
                        </div>
                       
                    ))}

                   

                    
                        
                        
                    </div>


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
                </div>
        </div>
    )
}

export default mainChatBot