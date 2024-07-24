import {useState} from 'react';
import LazyLoad from 'react-lazyload';
import { Container, Row, Col } from 'react-bootstrap';

import { CiStar } from 'react-icons/ci';
import FoodMenuDetailsModal from '../foodMenuDetailed/foodMenuDetailed';
import './foodMenuitems.css';

const randomValues = [12, 30, 18, 24, 39, 47, 50,17, 58, 5, 8, 40, 32, 21, 39, 8];

const randomDigit = Math.round(Math.random() * (randomValues.length - 1));


const FoodMenuitems = ({ menus }) => {
  const [isModalOpen,setModal]=useState(false)
  const handleModal=()=>{
    setModal((prev)=>!prev)
  }


  return (
    <Container>
      <Row>
        {menus.map((each) => (
          <Col key={each.food_id} xs={6} sm={6} md={4} lg={4} xl={3} className='menu-container' onClick={handleModal}>
            <FoodMenuDetailsModal setModal={isModalOpen}/>
            <LazyLoad height={200} offset={100}>
              <div className='menu-food-image-container'>
                <img src={each.imageUrl} alt={each.food_name} className='menu-food-image' />
              </div>
              <h1 className='food-menu-heading'>{each.food_name}</h1>
              <p className='food-menu-para'>{each.description}</p>
              <div className='d-flex'>
                <p className='food-menu-rating-para'>
                  <span><CiStar className='food-menu-rating' /></span>{each.rating}
                </p>
                <p className='food-menu-price-para' style={{textDecoration:"line-through",fontSize:12,marginRight:0,fontWeight:"normal"}}>
                  ₹{each.price + randomValues[randomDigit]}
                </p>
                <p className='food-menu-price-para' style={{marginLeft:0}}>₹{each.price}</p>
              </div>
            </LazyLoad>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FoodMenuitems;
