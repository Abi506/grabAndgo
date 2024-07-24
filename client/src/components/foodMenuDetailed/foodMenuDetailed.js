import { React, useState,useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios'
import { CiStar } from 'react-icons/ci';
import { IoMdCloseCircle } from "react-icons/io";

import FoodMenuitems from '../foodMenuItems/foodMenuitems';

import './foodMenuDetailed.css'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    width:"800px",
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius:'12px',
  },
};



const FoodMenuDetailsModal = ({setModal}) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [orderQuantity,setOrderQuantity]=useState(1)
  const [visibleItems,setVisibleItems]=useState(10)

  const getData = () => {
    const url = "https://mocki.io/v1/b5a869ae-46fe-4080-acb7-39f2384997e4";
    axios.get(url)
      .then((response) => {
        setData(response.data[0]);
      })
      .catch((error) => {
        console.log(error.message, "Error while fetching the data");
      });
  }

  useEffect(() => {
    getData();
  }, []);


  const closeModal = () => {
    setIsOpen(false);
  };

  const incrementQuantity=()=>{
    setOrderQuantity((prev)=>prev+1)
  }

  const decrementQuantity=()=>{
    if(orderQuantity>1){
        setOrderQuantity((prev)=>prev-1)
    }
  }
  
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
        <h1 className='food-heading-modal'>{data.food_name}</h1>
        <div className='d-flex flex-direction-row'>
            <div>
                <img src={data.imageUrl} alt={data.food_name} className='food-image-modal'/>
            </div>
            <div>
                <h2 className='food-para-modal'>{data.food_name}</h2>
                <p className='food-para-modal' style={{fontSize:"18px"}}>{data.description}</p>
                <div className='food-rating-price-container-modal'>
                <p><span><CiStar className='food-star-rating-modal'/></span>{data.rating}</p>
                <p className="food-price-para-modal">₹{data.price}</p>
                </div>
                <div className='d-flex flex-direction-row'>
                <div>
                    <button className='btn btn-primary ' onClick={decrementQuantity}>-</button>
                    <input type='text' className='input-order-quantity' value={orderQuantity}/>
                    <button className='btn btn-primary' onClick={incrementQuantity}>+</button>
                </div>
                <button type='button' className='m-auto btn btn-primary'>Add to Cart</button>
                </div>
            </div>
        </div>
        
        </div>
        <button onClick={closeModal} className='modal-close'><IoMdCloseCircle/></button>
      </Modal>
    </div>
  );
}

export default FoodMenuDetailsModal;
