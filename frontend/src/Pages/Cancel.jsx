import React from "react";
import './CSS/Cancel.css';
import cancel_icon from "../Components/Assets/cancelmark.png"

const Cancel = () =>{
    return (
        <div className="cancel">
            <div className="cancel-text">
                <img src={cancel_icon} alt="" className="cancel-icon"/>
                <h2>Payment Canceled</h2>
                <p>Your payment was canceled !</p>
            </div>
            
        </div>
    )
}

export default Cancel;