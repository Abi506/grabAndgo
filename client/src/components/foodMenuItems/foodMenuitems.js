import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { CiStar } from 'react-icons/ci';
import './foodMenuitems.css';

const randomValues = [12, 30, 18, 24, 39, 47, 50, 17, 58, 5, 8, 40, 32, 21, 39, 8];
const randomDigit = Math.round(Math.random() * (randomValues.length - 1));

const FoodMenuitems = ({ menus }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [itemPrice, setPrice] = useState('');

  const handleItem = (food) => {
    setSelectedFood(food);
    setModalOpen(true);
    setQuantity(1); // Reset quantity when opening the modal
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (selectedFood) {
      setPrice(selectedFood.price * quantity);
    }
  }, [quantity, selectedFood]);

  const handleClose = () => setModalOpen(false);

  return (
    <Container>
      <Row>
        {menus.map((each) => (
          <Col key={each._id} xs={6} sm={6} md={4} lg={4} xl={3} className='menu-container' onClick={() => handleItem(each)}>
            <div className='menu-food-image-container'>
              <img
                src={`http://localhost:3001/foodImages/${each.foodImageUrl}`}
                alt={each.name}
                className='menu-food-image'
              />
            </div>
            <h1 className='food-menu-heading'>{each.name}</h1>
            <p className='food-menu-para'>{each.description}</p>
            <div className='d-flex'>
              <p className='food-menu-rating-para'>
                <span><CiStar className='food-menu-rating' /></span>{each.ratings.length > 0 ? each.ratings[0].value : 'No rating'}
              </p>
              <p className='food-menu-price-para' style={{ textDecoration: "line-through", fontSize: 12, marginRight: 0, fontWeight: "normal" }}>
                ₹{each.price + randomValues[randomDigit]}
              </p>
              <p className='food-menu-price-para' style={{ marginLeft: 0 }}>₹{each.price}</p>
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={isModalOpen} onHide={handleClose} className='custom-modal'>
        <Modal.Header closeButton>
          <Modal.Title>{selectedFood ? selectedFood.name : 'Food Details'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='custom-modal-body'>
          {selectedFood && (
            <div className='d-flex flex-direction-row'>
              <img
                src={`http://localhost:3001/foodImages/${selectedFood.foodImageUrl}`}
                alt={selectedFood.name}
                style={{ width:"300px", marginBottom: '15px',borderRadius:"12px" }}
              />
              <div className='p-4'>
              <p>{selectedFood.description}</p>
              <p>Price: ₹{selectedFood.price}</p>
              <p>Rating: {selectedFood.ratings.length > 0 ? selectedFood.ratings[0].value : 'No rating'}</p>
              <div className='d-flex flex-direction-row justify-content-between w-75'>
              <div className='d-flex flex-direction-row'>
                <div>
                <button type='button' className='btn btn-primary' onClick={decrementQuantity}> - </button>
                <input type='text' className='p-1' value={quantity} style={{width:"50px",textAlign:"center",borderRadius:"5px",margin:'10px'}} readOnly /> 
                <button type='button' className='btn btn-primary' onClick={incrementQuantity}> + </button>
                </div>
              </div>
              <div>
                <p>₹{itemPrice}</p>
              <button type='button' className='btn add-button-styles'>Add</button>
              </div>
              </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default FoodMenuitems;
