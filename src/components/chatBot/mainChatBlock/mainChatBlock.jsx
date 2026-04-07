import { useEffect, useState, useRef } from 'react';
import {useLocation} from 'react-router-dom';
import Button from "../../Tools/button/button";


import "./mainChatBlock.css";


// Main Chatbot funciton 
const mainChatBot = () =>{

    const [inputValue, setInputValue] = useState("");
    const [files, setFiles] = useState([]);
    const [inputData ,setUserData] = useState([]);
    const [botValue, setBotValue] = useState("");
    const [showTitle, setShowTitle] = useState(true);
    const [botResponse, setBotResponse] = useState([])
    const [messages, setMessages] = useState([])
    const [show, setShow] = useState("");
    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null)
// getting state from previous locaiton 
    const location = useLocation();

    useEffect(() => {
        // on load send it data to AI so user would get imidiate response 
        const initialMessage = location.state?.chatbotMessage;

        if (initialMessage) {
            //cleare state so it doesnt not resend on the refresh 
            window.history.replaceState({}, document.title);

            const triggerAutoSend = async () => {
                setShowTitle(false); 

                await autoSubmit(initialMessage);
            };

            triggerAutoSend();
        }
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
// whne get state from home page it will auto send it to Gemini
    const autoSubmit = async (prompt) => {
        
        const API = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(`${API}/api/getChat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt, history: [] }),
            });

            const data = await response.json();
            const userMsg = { text: prompt, sender: 'user' };
            setMessages([userMsg]);
            const botMsg = { text: data.data, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

        const handleSubmit = async (userPrompt) => {

            // const userPrompt = inputValue;

            const userMsg = {
                text: userPrompt,
                files: files,
                sender: 'user'
            }

            setMessages(prev => [...prev, userMsg])
            // setUserData(prev => [...prev, userPrompt]);
            setInputValue(""); 

            const convertedFiles = await Promise.all(
                files.map(async (f) => ({
                    base64: await toBase64(f.file),
                    mimeType: f.type
                }))
            )

            setFiles([])

            const API = import.meta.env.VITE_API_URL;

            try {
                const response = await fetch(`${API}/api/getChat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        prompt: userPrompt, 
                        files: convertedFiles,
                        history: [] 
                    }),
                });

                const data = await response.json();
                console.log(data)
                const botMessage = data.data;
                console.log(botMessage)
               

                // Simulate/Fetch Bot Response
                const botMsg = { text: botMessage, sender: 'bot' };
                setMessages(prev => [...prev, botMsg]);
                // setBotResponse(prevRes => [...prevRes, botMessage])
               
            } catch (error) {
                console.error('Error:', error);
                
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

        const finalPrompt = (inputValue.trim() === "" && files.length > 0)
            ? "Describe this image or help me with it"
            : inputValue;

        if (inputValue.trim() !== "" || files.length > 0) {
            handleSubmit(finalPrompt)
            setShowTitle(false)
        }
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const mappedFiles = selectedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            type: file.type
        }));

        setFiles(prev => [...prev, ...mappedFiles])
    }

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(",")[1]);
            reader.onerror = reject;
        })
    }

    const openFilePicker = () =>{
        fileInputRef.current.click();
    }

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

                        {messages.map((msg, index) => (
                            <div key={index} className={`message-wrapper ${msg.sender}`}>
                                <div className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                                    {msg.text && <p>{msg.text}</p>}

                                    <div className="fileContainer">
                                        {msg.files?.map((f,i) => (
                                            <div key={i}> 
                                                {f.type.startsWith("image/") ? (
                                                    <img className="actualMessageImage" src={f.preview} alt="upload image" />
                                                ) : (
                                                        <div className='fileCard'>
                                                            {f.file?.name || "file"}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />

                    </div>
                    
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSend
                }}>
                    <div className='previewContainer'>
                        {files.map((f,i) => (
                            <div key={i} className='previewItem'>
                                {f.type.startsWith("image/") ? (
                                    <img  src={f.preview} alt="preview image"/>
                                ) : (
                                    <div className='fileCard'>
                                        {f.file.name}
                                    </div>
                                )}
                            </div>
                        ))}

                    </div>
                    <div className="inputSearchDiv">
                        
                        <button style={{borderRadius: 20}}type='button' onClick={openFilePicker}>
                            <b>+</b>
                        </button>
                        <input type="text"
                            className="promptInput"
                            id="prompt"

                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a prompt..."
                        />
                        <input 
                            type="file"
                            ref={fileInputRef}
                            style={{display: "none"}}
                            onChange={handleFileChange}
                            
                        />

                        <Button type="submit" onClick={handleSend} text="Send" style={{ width: 113, height: 53, color: "white", backgroundColor: "#82181A", borderRadius: 25}}  />
                    </div>
                </form> 
            </div>
        </div>
    )
}

export default mainChatBot