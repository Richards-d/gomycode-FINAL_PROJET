import React from "react";
import "./CSS/Success.css";
import success_icon from "../Components/Assets/checkmark.png"

const Success = () =>{
    return (
        <div className="success">
            <div className="success-text">
                <h2>Payment Successful</h2>
                <p>Thank you for payment !</p>
                <img src={success_icon} alt="" className="success-icon"/>
            </div>
        
        </div>
    )
}

export default Success;