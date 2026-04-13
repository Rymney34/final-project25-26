import { useState } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MainChatBot from './components/chatBot/mainChatBlock/mainChatBlock'
import LibraryHub from './Pages/libraryHub/libraryHub.jsx';
import AllEvents from './Pages/events/allEvents.jsx';
import WebApp from './webApp.jsx'
import Home from './Pages/Home/home.jsx';
import About from './Pages/about/about.jsx';
import ScrollToTop from './components/Tools/scrollToTop/scrollToTop.jsx';
import AddMuseum from './Pages/addMuseum/addMuseum.jsx';
// import EachMuseum from './Pages/EachMuseum/eachMuseum.jsx';
import AllMuseums from './Pages/allMuseums/allMuseums.jsx';
import EachMuseum from './Pages/EachMuseum/eachMuseum.jsx'
import Login from './Pages/login/Login.jsx';
import Register from './Pages/register/Register.jsx';
import Recomendations from './Pages/recomendations/recomendations.jsx';
import ProtectedRoute from './components/Tools/protectedRoute/protected.route.jsx';
import ProfileSettings from './Pages/profileSettings/profileSettings.jsx'
import LandingPage from './Pages/landingPage/landingPage.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
   
      <Router>
        
        <div>
         
          <ScrollToTop />
          <Routes>
            <Route
              path="/landingPage"
              element={<LandingPage />}
            />
            
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />
            <Route element={<ProtectedRoute/>}>
                <Route path="/" element={<WebApp />}>
                  <Route
                    path="/home"
                    element={<Home />}
                  />

                  <Route

                    path="/chatBot"
                    element={<MainChatBot />}
                  />

                  <Route

                    path="/events"
                    element={<allEvents />}
                  />
                  <Route

                    path="/libraryHub"
                    element={<libraryHub/>}
                  />

                  <Route

                    path="/about"
                    element={<About/>}
                  />

                  <Route

                    path="/addMuseum"
                    element={<AddMuseum />}
                  />
                  <Route

                    path="/eachMuseum/:id"
                    element={<EachMuseum/>}
                  />
                  <Route

                    path="/allMuseums"
                    element={<AllMuseums/>}
                  />

                  <Route

                    path="/profileSettings"
                    element={<ProfileSettings />}
                  />
                  <Route

                    path="/recomendations"
                    element={<Recomendations />}
                  />
                  <Route

                    path="/allEvents"
                    element={<AllEvents/>}
                  />
                  <Route

                    path="/libraries"
                    element={<LibraryHub />}
                  />
                </Route>
              </Route>
          </Routes>  

        </div>
      </Router>

  )
}

export default App
