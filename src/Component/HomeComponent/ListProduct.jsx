import React, { useEffect, useState } from "react";
import { ProductCard } from "../ShopComponent/ProductCard";
import axiosFetch from "../../Helper/Axios";

export const ListProduct = () => {
  const[token,setToken]=useState(sessionStorage.getItem("token"));
  
  const[data,setData]=useState([]);
  // const fatchData = async () => {
  
  //   const response = await axiosFetch({
  //     "url":"product/",
  //     "method":"GET",
  //   });
    
  //   // const
  //   console.log(response.data);
  //   setData(response.data);
  // };
  const fatchData = async () => {
    try {
      const response = await axiosFetch({
        url: "product/",
        method: "GET",
      });
  
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else if (response.data && Array.isArray(response.data.products)) {
        // if the data is nested under 'products'
        setData(response.data.products);
      } else {
        console.error("Unexpected response format:", response.data);
        setData([]); // fallback to empty array
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]); // fallback in case of failure
    }
  };
  

  
  useEffect(() => {
    fatchData();
  }, []);

  
  return (
    <>
      <section id="products" className="section product">
        <div className="container">
          <p className="section-subtitle"> -- Organic Products --</p>
          <h2 className="h2 section-title">All Organic Products</h2>
          <ul className="filter-list">
            <li>
              <button className="filter-btn active">
                <img
                  src="./images/filter-1.png"
                  width={20}
                  alt=""
                  className="default"
                />
                <img
                  src="./images/filter-1-active.png"
                  width={20}
                  alt=""
                  className="color"
                />
                <p className="filter-text">Fresh Vegetables & Fruits</p>
              </button>
            </li>
            <li>
              <button className="filter-btn">
                <img
                  src="./images/filter-2.png"
                  width={20}
                  alt=""
                  className="default"
                />
                <img
                  src="./images/filter-2-active.png"
                  width={20}
                  alt=""
                  className="color"
                />
                <p className="filter-text">Fish &amp; Meat</p>
              </button>
            </li>
            {/* <li>
              <button className="filter-btn">
                <img
                  src="./images/filter-3.png"
                  width={20}
                  alt=""
                  className="default"
                />
                <img
                  src="./images/filter-3-active.png"
                  width={20}
                  alt=""
                  className="color"
                />
                <p className="filter-text">Healthy Fruit</p>
              </button>
            </li> */}
            <li>
              <button className="filter-btn">
                <img
                  src="./images/filter-1.png"
                  width={20}
                  alt=""
                  className="default"
                />
                <img
                  src="./images/filter-1-active.png"
                  width={20}
                  alt=""
                  className="color"
                />
                <p className="filter-text">Dairy Products</p>
              </button>
            </li>
          </ul>
          <ul className="grid-list">
  {data.length === 0 ? (
    <p>No products available.</p>
  ) : (
    data.map((item) => (
      <ProductCard
        key={item.productid}
        id={item.productid}
        name={item.productName}
        description={item.description}
        price={item.price}
        img={item.img}
      />
    ))
  )}
</ul>

        </div>
      </section>
    </>
  );
};
