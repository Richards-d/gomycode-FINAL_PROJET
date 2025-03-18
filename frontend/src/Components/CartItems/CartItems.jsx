import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../../assets/remove_icon.png"
import { useNavigate } from "react-router-dom";

const CartItems = () => {
    const {all_product, cartItems, removeFromCart, getTotalCartAmount} = useContext(ShopContext);

    const navigate = useNavigate();

    return (
        <div className="cartitems">
            <div className="cartitems-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if(cartItems[e.id]>0)
                {
                    return <div>
                                <div className="cartitems-format cartitems-main">
                                    <img src={e.image} alt="" className="cart-icon" />
                                    <p>{e.name}</p>
                                    <p>{e.price} F.CFA</p>
                                    <button className="cartitems-quantity">{cartItems[e.id]}</button>
                                    <p>{e.price*cartItems[e.id]} F.CFA</p>
                                    <img src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" className="remove-icon" />
                                </div>
                                <hr />
                            </div>
                }
                return null;
            })}

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>{getTotalCartAmount()} F.CFA</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="caritems-total-item">
                            <h3>Total</h3>
                            <h3>{getTotalCartAmount()} F.CFA</h3>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder="promo code" name="" id="" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default CartItems;