import { Outlet, useLocation } from 'react-router-dom';
import Header from '../src/components/header/header';
import Footer from './components/footer/Footer';
import MiniChatBot from './components/miniChatBot/miniChatBot';


function WebApp() {
    const location = useLocation(); 
    const hideFooterRoutes = ["/login", "/signup", "/chatBot"];
    const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
    return (
        <div>
            <Header />
            <div>
                <Outlet />
                {!shouldHideFooter && <MiniChatBot />}
                
            </div>
            
           { !shouldHideFooter && <Footer />}
        </div>
    );

}

export default WebApp