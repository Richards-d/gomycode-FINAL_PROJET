import React from "react";
import "./DescriptionBox.css"

const DescriptionBox = () => {
    return (
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (000)</div>
            </div>
            <div className="descriptionbox-description">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores natus blanditiis perferendis nulla ex. Quisquam iste magnam maxime voluptatibus dolores. Eligendi ab incidunt perferendis facere natus. Incidunt ea nostrum cumque!</p>
            </div>
        </div>
    )
}

export default DescriptionBox;