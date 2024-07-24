import { useState, useEffect } from 'react';
import axios from 'axios';
import FoodMenuitems from '../foodMenuItems/foodMenuitems';
import { Container, Dropdown } from 'react-bootstrap';
import './foodMenu.css'

import FoodMenuDetailsModal from '../foodMenuDetailed/foodMenuDetailed'

const FoodMenu = () => {
  const [data, setData] = useState([]);
  const [visibleItems,setVisibleItems]=useState(10)

  const getData = () => {
    const url = "https://mocki.io/v1/b5a869ae-46fe-4080-acb7-39f2384997e4";
    axios.get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error.message, "Error while fetching the data");
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const loadMoreItems=()=>{
    setVisibleItems((prevCount) => prevCount + 10); // Load 10 more items
  }

  return (
    <Container>
        <div className='food-menu-drop-down-container'>
        
      <select id="food-menu-sort" className='food-menu-drop-down'>
        <option className='food-sort-options' hidden>Sort By</option>
        <option value="rating">Rating </option>
        <option value="lowtohigh">Cost:LowtoHigh</option>
        <option value="hightolow">Cost:HightoLow</option>
      </select>
      <select id='food-menu-sort-price-range' className='food-menu-drop-down'>
        <option hidden>Price Range</option>
        <option >Less than Rs.100</option>
        <option >Rs.100 to Rs.200</option>
        </select>
        <button type='button' className='food-menu-drop-down-button'>Pure Veg</button>
        </div>
        <FoodMenuitems menus={data.slice(0, visibleItems)} />
        {visibleItems < data.length && (
            <div className='d-flex flex-direction-row justify-content-center'>
        <button onClick={loadMoreItems} className='btn btn-primary mb-5'>Load More</button>
        </div>
      )}
      <FoodMenuDetailsModal/>
    </Container>
  );
}

export default FoodMenu;
