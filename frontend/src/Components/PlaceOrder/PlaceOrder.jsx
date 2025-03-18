import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { ShopContext } from "../../Context/ShopContext";
import { loadStripe } from "@stripe/stripe-js";

const PlaceOrder = () => {
  const { all_product, getTotalCartAmount, cartItems } = useContext(ShopContext);
  
  const stripePromise = loadStripe("pk_test_51QjVxBEHLMEL5OMQVCqR5gPxQag18mlfA05HUhULz43OfA7jcEJ38Xi0Z9gohQhCmq6EQyNiWq5TeZr0qgp23yhU00fkxp6lMx");

  const [formData, setFormData] = useState({
          firstname:"",
          lastname:"",
          email:"",
          street:"",
          city:"",
          state:"",
          zipcode:"",
          country:"",
          phone:""
    })

    const changeHandler = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // Préparer les produits pour Stripe
    const items = all_product
      .filter((product) => cartItems[product.id] > 0)
      .map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: cartItems[product.id],
      }));

      // Checks if Cart is empty
    if (items.length === 0) {
      alert("Cart is empty !");
      return;
    }

    const response = await fetch("http://localhost:3000/makepayment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    });

    const session = await response.json();
    console.log("Server response:", session);

    if (session?.id) {
      stripe.redirectToCheckout({ sessionId: session.id });
    } else {
      console.error("Error creating Stripe session");
    }
  };

  const handleDelivery = async (e)=>{
    e.preventDefault();

    console.log("Delivery Information", formData)

    await fetch('http://localhost:3000/deliveryinformation', {
        method:'POST',
        headers:{
            Accept:"application/form-data",
            'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
    }).then((response) => response.json())
  }

  return (
    <form className="place-order" onSubmit={handleDelivery} >
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name="firstname" value={formData.firstname} onChange={changeHandler} type="text" placeholder="First name" />
          <input name="lastname" value={formData.lastname} onChange={changeHandler} type="text" placeholder="Last name" />
        </div>
        <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email address" />
        <input name="street" value={formData.street} onChange={changeHandler} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input name="city" value={formData.city} onChange={changeHandler} type="text" placeholder="City" />
          <input name="state" value={formData.state} onChange={changeHandler} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input name="zipcode" value={formData.zipcode} onChange={changeHandler} type="text" placeholder="Zip code" />
          <input name="country" value={formData.country} onChange={changeHandler} type="text" placeholder="Country" />
        </div>
        <input name="phone" value={formData.phone} onChange={changeHandler} type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <h1>Cart Totals</h1>

        {all_product.map((e) => {
                        if(cartItems[e.id]>0)
                        {
                            return <div>
                                        <div className="cartitems-format-po cartitems-main-po">
                                            <img src={e.image} alt="" className="cart-icon-po" />
                                            <p>{e.name}</p>
                                            <button className="cartitems-quantity-po">{cartItems[e.id]}</button>
                                            <p>{e.price*cartItems[e.id]} F.CFA</p>
                                        </div>
                                        <hr />
                                    </div>
                        }
                        return null;
                    })}
        <div className="cartitems-total">
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
          <button type="submit" onClick={handleCheckout}>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
