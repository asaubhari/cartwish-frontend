import React from "react";
import "./SingleProduct.css";
import { useState } from "react";
// import QuantityInput from "./QuantityInput";
import { useParams } from "react-router-dom";
import useData from "../../hooks/useData";
import config from "../../config.json";

const SingleProduct = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const { id } = useParams();
  const { data: product, error, isLoading } = useData(`/product/${id}`);
  return (
    <section className="align_center single_product">
      {product && (
        <>
          {" "}
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => (
                <img
                  src={$`{config.backendURL}/products/${image}`}
                  alt={product.title}
                  className={selectedImage === index ? "selected_image" : ""}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
            <img
              src={`${config.backendURL}/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>
          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_desciption">{product.description}</p>
            <p className="single_product_price">${product.price.toFixed(2)}</p>
            <h2 className="quantity_title">Quantity:</h2>
            <div className="align_center quantity_input">
              <QuantityInput />
            </div>
            <button className="search_button add_cart">Add to Cart</button>
          </div>{" "}
        </>
      )}
    </section>
  );
};

export default SingleProduct;
