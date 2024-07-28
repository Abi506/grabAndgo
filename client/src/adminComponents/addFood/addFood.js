import { useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import './addFood.css';

const AddFood = () => {
    const [dishDetails, setDish] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        foodImageUrl: null // Initialize as null for file input
    });

    const handleInputs = (e) => {
        const { name, value, type, files } = e.target;
        setDish((prev) => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value // Handle file input
        }));
    };

    const postDish = async (e) => {
        e.preventDefault();
        if (dishDetails.name && dishDetails.description && dishDetails.price && dishDetails.category && dishDetails.foodImageUrl) {
            const url = "http://localhost:3001/food/";
            const formData = new FormData();
            formData.append('name', dishDetails.name);
            formData.append('description', dishDetails.description);
            formData.append('price', dishDetails.price);
            formData.append('category', dishDetails.category);
            formData.append('foodImageUrl', dishDetails.foodImageUrl); // Append file

            try {
                const response = await axios.post(url, formData, {
                    headers: {
                        // No need to set Content-Type; the browser will handle it
                    }
                });
                console.log(response,'response from backend')
                if (response.status === 200 || response.status === 201) {
                    setDish({
                        name: "",
                        description: "",
                        price: "",
                        category: "",
                        foodImageUrl: null // Reset state after successful upload
                    });
                }
            } catch (error) {
                console.error("Error uploading the dish:", error);
            }
        } else {
            alert("Enter all the details");
        }
    };

    return (
        <Container className='p-5'>
            <h1>Add new dish</h1>
            <form onSubmit={postDish}>
                <input type="text" placeholder='Dish name' value={dishDetails.name} className='dish-upload-inputs' onChange={handleInputs} name='name' />
                <br />
                <textarea cols={35} rows="100%" value={dishDetails.description} className='dish-upload-inputs' placeholder='Dish Description' onChange={handleInputs} name='description'></textarea>
                <br />
                <select className='dish-upload-inputs' onChange={handleInputs} name='category'>
                    <option value="category" hidden>Category</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Sides">Sides</option>
                    <option value="Veg">Veg</option>
                    <option value="FastFood">Fast Food</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="CommonDish">Common Dish</option>
                </select>
                <br />
                <input type="number" value={dishDetails.price} name='price' placeholder='Price of Dish' className='dish-upload-inputs' onChange={handleInputs} />
                <br />
                <input type='file' name='foodImageUrl' className='dish-upload-inputs' onChange={handleInputs} />
                <br />
                <button type="submit" className='btn btn-primary'>Add Dish</button>
            </form>
        </Container>
    );
};

export default AddFood;