import React, { useState } from "react";
import './Newsletter.css'

const NewsLetter = () => {
    const [formData, setFormData] = useState({
        email:""
    });

    const changeHandler = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleNewsletter = async(e) =>{
        e.preventDefault();

        console.log('Newsletter Information', formData);

        // Checks if at least one field is filled
        const isFormFilled = Object.values(formData).some(value => value.trim() !== "");

        if (!isFormFilled) {
        alert("Please enter at least one piece of information for registration.");
        return;
        }
        
        await fetch('https://back-2l9a.onrender.com/newsletter',{
            method: 'POST',
            headers:{
                Accept:"application/form-data",
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formData)
        }).then((response) => response.json())
    }



    return (
        <div className="newsletter">
            <h1>Get Exclusive Offers On Your Mail</h1>
            <p>Subscribe to our newsletter and stay updated</p>
            <form onSubmit={handleNewsletter}>
                <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Your Email ID" />
                <button type="submit">Subscribe</button>
            </form>
        </div>
    )
}

export default NewsLetter;