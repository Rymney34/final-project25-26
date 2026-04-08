import { useEffect, useState, useRef } from 'react';
import {useLocation} from 'react-router-dom';
import Button from "../../Tools/button/button";
import Spinner from "../../spinner/Spinner.jsx";

import "./mainChatBlock.css";


// Main Chatbot funciton 
const mainChatBot = () =>{

    const [inputValue, setInputValue] = useState("");
    const [files, setFiles] = useState([]);
    const [inputData ,setUserData] = useState([]);
    const [botValue, setBotValue] = useState("");
    const [showTitle, setShowTitle] = useState(true);
    const [loading, setLoading] = useState(false);
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

    const formatMessage = (msg) => {
        if(msg.sender === 'user') return <p>{msg.text}</p>

        const locationRegex = /\[LOCATION:(.*?)\]/;
        const match = msg.text.match(locationRegex);

        if(match){
            const address = match[1];
            const cleanText = msg.text.replace(locationRegex, '').trim();
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

            return (
                <>
                    {cleanText && <p>{cleanText}</p>}
                    <div className="map-bubble-link" style={{
                        marginTop: '8px',
                        padding: '10px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        border: '2px solid rgba(255,255,255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <a href={mapUrl} target='_blank' rel="noreferre" style={{color: '#4285F4', fontWeight: 'bold', textDecoration: 'none'}}>
                            📍 View on Google Maps
                        </a>

                    </div>
                </>
            )
        }
        return <p>{msg.text}</p>
    }


// when get state from home page it will auto send it to Gemini
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

    //submiting value  and sending it to backend 
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
            setLoading(true)

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
                        history: getHistory()
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
            finally{
                setLoading(false)
            }
        }
    //getting user and bot cahting history - previous texts 
    const getHistory = () => {
        return messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }))
    }
  //calling submmit fucniton and extra rules in case image is sent
    const handleSend = () => {

        const finalPrompt = (inputValue.trim() === "" && files.length > 0)
            ? "Describe this image or help me with it"
            : inputValue;

        if (inputValue.trim() !== "" || files.length > 0) {
            handleSubmit(finalPrompt)
            setShowTitle(false)
        }
    };

    //function to track file change and if files are added 
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const mappedFiles = selectedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            type: file.type
        }));
        //setting file to array adding new to previous
        setFiles(prev => [...prev, ...mappedFiles])
    }
    //converter function AI only support base64 format images 
    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(",")[1]);
            reader.onerror = reject;
        })
    }
    //func that helps to open file picker 
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
                    //mapping over array of requseted and resposne from user side +  //responses  +  //displaying files in case are added
                        {messages.map((msg, index) => (
                            <div key={index} className={`message-wrapper ${msg.sender}`}>
                                <div className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>

                                    {msg.text && formatMessage(msg)}
                                
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
                        {loading && (
                            <div className='messageWrapper bot'>
                                <div className='bot-message'>
                                    <div >
                                        <Spinner width={100}/>
                                    </div>
                                </div>


                            </div>
                        )}
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