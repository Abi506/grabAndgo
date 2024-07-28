import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { CiStar } from 'react-icons/ci';
import { IoMdCloseCircle } from "react-icons/io";

import './foodMenuDetailed.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    width: "800px",
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '12px',
  },
};

const FoodMenuDetailsModal = ({ isOpen, onClose, foodId }) => {
  const [data, setData] = useState([]);
  const [orderQuantity, setOrderQuantity] = useState(1);

  const getData = () => {
    const url = `http://localhost:3001/food/${foodId}`;
    const response=axios.get(url)
    console.log(response,'reponse from modal')

  };

  useEffect(() => {
    if (foodId) {
      getData();
    }
  }, [foodId]);

  const incrementQuantity = () => {
    setOrderQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (orderQuantity > 1) {
      setOrderQuantity((prev) => prev - 1);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Food Details Modal"
    >
      <div>
        <h1 className='food-heading-modal'>{data.food_name}</h1>
        <div className='d-flex flex-direction-row'>
          <div>
            <img src={data.imageUrl} alt={data.food_name} className='food-image-modal' />
          </div>
          <div>
            <h2 className='food-para-modal'>{data.food_name}</h2>
            <p className='food-para-modal' style={{ fontSize: "18px" }}>{data.description}</p>
            <div className='food-rating-price-container-modal'>
              <p><span><CiStar className='food-star-rating-modal' /></span>{data.rating}</p>
              <p className="food-price-para-modal">₹{data.price}</p>
            </div>
            <div className='d-flex flex-direction-row'>
              <div>
                <button className='btn btn-primary' onClick={decrementQuantity}>-</button>
                <input type='text' className='input-order-quantity' value={orderQuantity} readOnly />
                <button className='btn btn-primary' onClick={incrementQuantity}>+</button>
              </div>
              <button type='button' className='m-auto btn btn-primary'>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <button onClick={onClose} className='modal-close'><IoMdCloseCircle /></button>
    </Modal>
  );
}

export default FoodMenuDetailsModal;
