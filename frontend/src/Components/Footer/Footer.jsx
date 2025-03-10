import React from "react";
import './Footer.css';
import logo from "../Assets/logo3.png";
import facebook_icon from "../Assets/facebook_1.png";
import instagram_icon from "../Assets/Instagram_1.svg";
import tiktok_icon from "../Assets/tiktok-icon.png";
import address_icon from "../Assets/address-icon.png";
import phone_icon from "../Assets/phone-icon1.png";
import mail_icon from "../Assets/mail-icon.png";
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={logo} alt="" />
                <p>YËLËP</p>
            </div>
            <div className="footer-details">
                <div className="footer-about">
                    <h2>About</h2>
                    <p>Yëlëp Tek Sa Kaw is a vintage shop with <br />streetwear for men: shirts, T-shirts, baseball jerseys, <br />basketball jerseys and sneakers, come staight <br />from the United State. You will also find <br />a wide selection of brands.</p>
                </div>
                <div className="footer-contact">
                    <h2>Contact</h2>
                    <div className="footer-icon-contact">
                        <div className="footer-icon-contact-container">
                            <img src={address_icon} alt="" />
                            <p>Nord Foire, DAKAR</p>
                        </div>
                        <div className="footer-icon-contact-container">
                            <img src={phone_icon} alt="" />
                            <p>+221 778876735</p>
                        </div>
                        <div className="footer-icon-contact-container">
                            <img src={mail_icon} alt="" />
                            <p>talibouya2005@gmail.com</p>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <Link to='https://facebook.com/100083192715635' target="_blank" ><img src={facebook_icon} alt="" /></Link>
                </div>
                <div className="footer-icons-container">
                    <Link to='https://www.instagram.com/yelep_tek_sa_kaaw?igsh=am82eDlqMTg2dGc%3D&utm_source=qr' target="_blank"><img src={instagram_icon} alt="" /></Link>
                </div>
                <div className="footer-icons-container">
                    <Link to='https://www.tiktok.com/@yeleupteksakaw?_t=ZM-8u3Ig85yaNb&_r=1' target="_blank"><img src={tiktok_icon} alt="" /></Link>
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