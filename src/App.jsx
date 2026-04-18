import { useState, Suspense } from 'react'
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
import Page404 from './components/errorBoundary/Page404.jsx';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.jsx';
import Spinner from './components/spinner/Spinner.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
   
      <Router>
        <div>
          <Suspense fallback={<Spinner />}>
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
                    <Route index element={<Navigate to='/home' replace />}  />
                    <Route
                      path="/home"
                      element={<ErrorBoundary><Home /></ErrorBoundary>}
                    />
                    <Route
                      path="/chatBot"
                      element={<ErrorBoundary><MainChatBot /></ErrorBoundary>}
                    />
                    <Route
                      path="/about"
                      element={<About/>}
                    />
                    <Route
                      path="/addMuseum"
                      element={<ErrorBoundary><AddMuseum /></ErrorBoundary>}
                    />
                    <Route
                      path="/eachMuseum/:id"
                      element={<ErrorBoundary><EachMuseum /></ErrorBoundary>}
                    />
                    <Route
                      path="/allMuseums"
                      element={<ErrorBoundary><AllMuseums /></ErrorBoundary>}
                    />
                    <Route
                      path="/profileSettings"
                      element={<ErrorBoundary><ProfileSettings /></ErrorBoundary>}
                    />
                    <Route
                      path="/recomendations"
                      element={<Recomendations />}
                    />
                    <Route
                      path="/allEvents"
                      element={<ErrorBoundary><AllEvents /></ErrorBoundary>}
                    />
                    <Route
                      path="/libraries"
                      element={<ErrorBoundary><LibraryHub /></ErrorBoundary>}
                    />
                    <Route
                      path="*"
                      element={<Page404 />}
                    />
                  </Route>
                </Route>
            </Routes>  
          </Suspense>
        </div>
      </Router>
  )
}

export default App
