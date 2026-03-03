import "./Footer.css";
import logo from '../../../resources/img/logo.png'
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__brand">
          <div className="footer__logo">
            <img src={logo} alt="Welsh Heritage" />
          </div>

          <p className="footer__description">
            Preserving and sharing Welsh heritage for future generations.
          </p>
        </div>

        <div className="footer__column">
          <h4 className="footer__title">Quick Links</h4>
          <ul className="footer__list">
            <li><Link to="/About">About</Link></li>
            <li><Link to="/ourPortfolio">Chat with AI</Link></li>
            <li><Link to="/AboutUs">Recomendations</Link></li>
            <li><Link to="/AboutUs">All Museums</Link></li>
            <li><Link to="/AboutUs">Library</Link></li>
            <li><Link to="/AboutUs">Events</Link></li>
            <li><Link to="/AboutUs">Home</Link></li>
          </ul>
        </div>

        <div className="footer__column">
          <h4 className="footer__title">Connect</h4>
          <ul className="footer__list">
            <li><a href="https://www.instagram.com/">Instagram</a></li>
            <li><a href="https://www.facebook.com/">Facebook</a></li>
            <li><a href='https://x.com/'>X social media</a></li>
          </ul>
        </div>

      </div>

      
      <div className="footer__bottom">
        <span> 2026 Welsh Heritage</span>

        
      </div>
    </footer>
  );
}

export default Footer;
