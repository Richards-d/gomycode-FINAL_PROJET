import React from "react";
import './Footer.css';
import logo from "../Assets/logo3.png";
import facebook_icon from "../Assets/facebook_1.png";
import instagram_icon from "../Assets/Instagram_1.svg";
import whatsapp_icon from "../Assets/whatsapp_icon.png"

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={logo} alt="" />
                <p>YËLËP</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={facebook_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={instagram_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={whatsapp_icon} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @2024 - All Right Reserved</p>
            </div>
        </div>
    )
}

export default Footer;