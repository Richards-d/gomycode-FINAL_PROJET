import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";

const RelatedProducts = () => {
    const[relatedProducts,setRelatedProducts] = useState([]);
    
        useEffect(()=>{
            fetch('http://localhost:4000/relatedproducts')
            .then((response) => response.json())
            .then((data) => setRelatedProducts(data));
        },[])


    return (
        <div className="relatedproducts">
            <h1>Related Products</h1>
            <hr />
            <div className="relatedproducts-items">
                {relatedProducts.map((item,i) =>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
                })}
            </div>
            
        </div>
    )
}

export default RelatedProducts;