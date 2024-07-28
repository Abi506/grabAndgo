import { useState, useEffect, React } from 'react';
import { Container } from 'react-bootstrap';
import { IoIosSearch } from "react-icons/io";
import axios from 'axios';
import cookie from 'js-cookie'
import './search.css';

const Search = () => {
    const [data, setData] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const getData = async(query = '') => {
        const token=cookie.get("jwt_id")
        const url = `http://localhost:3001/food?search=${query}`;
        await axios.get(url,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((response) => {
                setData(response.data);
        })
        .catch((error) => {
                console.log(error.message, "Error while fetching the data");
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSearchInput = (e) => {
        const query = e.target.value;
        setSearchInput(query);
        getData(query);
    };

    return (
        <Container>
            <div className='search-input-container'>
                <IoIosSearch className='search-icon' />
                <input
                    type='search'
                    name='search-food'
                    className='search-input'
                    placeholder='Search Your Choices'
                    onChange={handleSearchInput}
                />
            </div>
            <ul className='search-items-container'>
                {data.map(each => (
                    <li key={each._id} className='d-flex search-list'>
                        <img
                            src={`http://localhost:3001/foodImages/${each.foodImageUrl}`}
                            alt={each.name}
                            className='search-dish-image'
                        />
                        <div>
                            <h1 className='search-dish-heading'>{each.name}</h1>
                            <p className='search-dish-para'>{each.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default Search;
