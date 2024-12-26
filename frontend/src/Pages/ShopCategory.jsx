import React, { useContext } from "react";
import "./CSS/ShopCategory.css"
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/drop_down_icon.png"
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
    const {all_product} = useContext(ShopContext)
    return (
        <div className="shop_category">
            <div className="shop-category-banner">

            </div>

            <div className="shop-category-index">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="shop-category-sort">
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shop-category-products">
                {all_product.map((item,i) => {
                    if (props.category === item.category){
                        return  <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
                    }
                    else {
                        return null;
                    }
                })}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>

        </div>
    )
}

export default ShopCategory;