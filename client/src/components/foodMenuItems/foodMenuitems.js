import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { CiStar } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import { addItems } from '../../slices/cartSlice';
import './foodMenuitems.css';

const randomValues = [12, 30, 18, 24, 39, 47, 50, 17, 58, 5, 8, 40, 32, 21, 39, 8];
const randomDigit = Math.round(Math.random() * (randomValues.length - 1));

const FoodMenuitems = ({ menus }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showAlert,setAlert]=useState(false)
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

  const dispatch=useDispatch()

  const addItemsCart = () => {
    const itemDetails = {
        id: selectedFood._id,
        foodImageUrl:selectedFood.foodImageUrl,
        quantity: quantity,
        price: selectedFood.price,
        name: selectedFood.name
    };
    dispatch(addItems(itemDetails));
    setAlert(true);

    setTimeout(() => setAlert(false), 3000);

    handleClose();
};


  return (
    <Container>
      {showAlert &&(
      <div className='alert alert-success mt-5 alert-custom-styles'>
        Added To Cart
      </div>
      )}
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
              </div>
              <div className='align-self-center'>
              <button type='button' className='btn add-button-styles' onClick={addItemsCart}>Add</button>
              </div>
              
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default FoodMenuitems;
