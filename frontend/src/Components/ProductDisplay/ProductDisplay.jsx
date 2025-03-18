import React, { useContext } from "react";
import "./ProductDisplay.css"
import star_icon from "../../assets/star_icon.png"
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {

    const {product} = props;
    const {addToCart} = useContext(ShopContext);

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt="" />
                </div>

            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img className="stardull" src={star_icon} alt="" />
                    <p>(000)</p>
                </div>
                <div className="productdisplay-right-price">{product.price} F.CFA</div>
                <div className="productdisplay-right-description">
                    jhgojgjd jzjfhpzifp ijzpghpazh
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                <p className="productdisplay-right-category"><span>Category:</span> Clothes, T-shir, Shirt</p>
                <p className="productdisplay-right-category"><span>Tags:</span> Modern, Lastest</p>
            </div>
            
            
        </div>
    )
}

export default ProductDisplay;