import { useState, useEffect } from 'react';
import axios from 'axios';
import FoodMenuitems from '../foodMenuItems/foodMenuitems';
import { Container } from 'react-bootstrap';
import cookie from 'js-cookie';
import './foodMenu.css';
import FoodMenuDetailsModal from '../foodMenuDetailed/foodMenuDetailed';

const FoodMenu = () => {
  const [data, setData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(10);
  const [sort, setSort] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [isPureVeg, setIsPureVeg] = useState(false);

  const getData = async () => {
    const token = cookie.get("jwt_id");
    const params = new URLSearchParams();

    if (sort) {
      params.append('sort', sort);
    }
    if (priceRange) {
      params.append('priceRange', priceRange);
    }
    if (isPureVeg) {
      params.append('isPureVeg', isPureVeg);
    }

    const url = `http://localhost:3001/food/?${params.toString()}`;

    try {
      console.log(url, 'url');
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("triggered");
      setData(response.data);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, [sort, priceRange, isPureVeg]);

  const loadMoreItems = () => {
    setVisibleItems((prevCount) => prevCount + 10); // Load 10 more items
  };

  return (
    <Container>
      <div className='food-menu-drop-down-container'>
        <select
          id="food-menu-sort"
          className='food-menu-drop-down'
          onChange={(e) => setSort(e.target.value)}
        >
          <option className='food-sort-options' hidden>Sort By</option>
          <option value="low_to_high">Cost: Low to High</option>
          <option value="high_to_low">Cost: High to Low</option>
        </select>
        <select
          id='food-menu-sort-price-range'
          className='food-menu-drop-down'
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option hidden>Price Range</option>
          <option value="less_than_100">Less than Rs.100</option>
          <option value="100_to_200">Rs.100 to Rs.200</option>
        </select>
        <button
          type='button'
          className='food-menu-drop-down-button'
          onClick={() => setIsPureVeg(prev => !prev)}
        >
          {isPureVeg ? 'All Items' : 'Pure Veg'}
        </button>
      </div>
      <FoodMenuitems menus={data.slice(0, visibleItems)} />
      {visibleItems < data.length && (
        <div className='d-flex flex-direction-row justify-content-center'>
          <button onClick={loadMoreItems} className='btn btn-primary mb-5'>Load More</button>
        </div>
      )}
      <FoodMenuDetailsModal />
    </Container>
  );
}

export default FoodMenu;
