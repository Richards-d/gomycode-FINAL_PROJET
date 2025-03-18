import { useEffect, useState } from "react"
import "./ListProduct.css"
import remove_icon from "../../assets/remove_icon.png"

const ListProduct = () => {

  const [allproducts,setAllProducts] = useState([]);

  const fetchInfo = async () =>{
    await fetch('https://back-2l9a.onrender.com/allproducts').then(async (response) => {
      const data = await response.json()
      setAllProducts(data.data)
    });
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const remove_product = async (id)=>{
    await fetch('https://back-2l9a.onrender.com/removeproduct',{
      method: 'POST',
      headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
          return <>
          <div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} className="listproduct-product-icon" alt="" />
            <p>{product.name}</p>
            <p>{product.price} F.CFA</p>
            <p>{product.category}</p>
            <img width="16px" onClick={()=>{remove_product(product.id)}} src={remove_icon} alt="" className="listproduct-remove-icon" />
          </div>
          <hr />
          </>
        })}
      </div>
      
    </div>
  )
}

export default ListProduct
