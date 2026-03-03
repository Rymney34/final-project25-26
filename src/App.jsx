import { useState } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MainChatBot from './components/chatBot/mainChatBlock/mainChatBlock'
import WebApp from './webApp.jsx'
import Home from './Pages/Home/home.jsx';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<WebApp />}>

              <Route
                path="/home"
                element={<Home />}
              />

              <Route

                path="/chatBot"
                element={<MainChatBot />}
              />
           

            </Route>
            
          </Routes>  

        </div>
      </Router>

  )
}

export default App
