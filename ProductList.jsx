import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";
import Navbar from "./Navbar";

const plantData = [
  {
    category: "Indoor",
    plants: [
      { id: 1, name: "Fiddle Leaf Fig", price: 25, image: "/images/fiddle.jpg" },
      { id: 2, name: "Snake Plant", price: 15, image: "/images/snake.jpg" },
      { id: 3, name: "Peace Lily", price: 20, image: "/images/peace.jpg" },
      { id: 4, name: "ZZ Plant", price: 22, image: "/images/zz.jpg" },
      { id: 5, name: "Spider Plant", price: 12, image: "/images/spider.jpg" },
      { id: 6, name: "Rubber Plant", price: 18, image: "/images/rubber.jpg" },
    ],
  },
  {
    category: "Outdoor",
    plants: [
      { id: 7, name: "Aloe Vera", price: 10, image: "/images/aloe.jpg" },
      { id: 8, name: "Bamboo Palm", price: 30, image: "/images/bamboo.jpg" },
      { id: 9, name: "Gardenia", price: 28, image: "/images/gardenia.jpg" },
      { id: 10, name: "Hibiscus", price: 25, image: "/images/hibiscus.jpg" },
      { id: 11, name: "Lavender", price: 18, image: "/images/lavender.jpg" },
      { id: 12, name: "Rosemary", price: 15, image: "/images/rosemary.jpg" },
    ],
  },
  {
    category: "Succulents",
    plants: [
      { id: 13, name: "Echeveria", price: 8, image: "/images/echeveria.jpg" },
      { id: 14, name: "Jade Plant", price: 12, image: "/images/jade.jpg" },
      { id: 15, name: "Haworthia", price: 7, image: "/images/haworthia.jpg" },
      { id: 16, name: "Lithops", price: 5, image: "/images/lithops.jpg" },
      { id: 17, name: "Sedum", price: 6, image: "/images/sedum.jpg" },
      { id: 18, name: "Crassula", price: 10, image: "/images/crassula.jpg" },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart({ ...addedToCart, [plant.name]: true });
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <Navbar cartQuantity={totalQuantity} />
      {plantData.map((category) => (
        <div key={category.category}>
          <h2>{category.category}</h2>
          <div className="plant-category">
            {category.plants.map((plant) => (
              <div key={plant.id} className="plant-card">
                <img src={plant.image} alt={plant.name} width="150" />
                <h3>{plant.name}</h3>
                <p>${plant.price}</p>
                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={addedToCart[plant.name]}
                >
                  {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
