import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItems, addItems } from '../../slices/cartSlice';
import { Container } from 'react-bootstrap';
import { IoMdTrash } from "react-icons/io";
import './cart.css';

const Cart = () => {
    const cart = useSelector(state => state.cartInfo.cart); // Ensure the correct state path
    const [localCart, setLocalCart] = useState([]);
    const [showAlert, setAlert] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setLocalCart(cart.map(item => ({
            ...item,
            quantity: item.quantity || 1,
            totalPrice: (item.quantity || 1) * item.price
        })));
    }, [cart]);

    const updateQuantityInCart = (id, quantity) => {
        const item = localCart.find(item => item.id === id);
        if (item) {
            dispatch(addItems({
                id,
                quantity,
                price: item.price,
                name: item.name,
                totalPrice: quantity * item.price
            }));
        }
    };

    const increment = (selectedFood) => {
        const updatedQuantity = selectedFood.quantity + 1;
        setLocalCart(prevCart => {
            const updatedCart = prevCart.map(item => {
                if (item.id === selectedFood.id) {
                    return { ...item, quantity: updatedQuantity, totalPrice: updatedQuantity * item.price };
                }
                return item;
            });
            updateQuantityInCart(selectedFood.id, updatedQuantity);
            return updatedCart;
        });
    };

    const decrement = (selectedFood) => {
        const updatedQuantity=null
        if(updatedQuantity>1){
            updatedQuantity=selectedFood.quantity-1
        }
        console.log(updatedQuantity,'updated quantity')
        setLocalCart(prevCart => {
            const updatedCart = prevCart.map(item => {
                if (item.id === selectedFood.id) {
                    return { ...item, quantity: updatedQuantity, totalPrice: updatedQuantity * item.price };
                }
                return item;
            });
            updateQuantityInCart(selectedFood.id, updatedQuantity);
            return updatedCart;
        });
    };

    const cartDeleteItem = (id) => {
        dispatch(deleteItems(id));
        setAlert(true);
        setTimeout(() => setAlert(false), 3000);
    };

    return (
        <Container className='w-75'>
            {showAlert && (
                <div className='alert alert-warning mt-4'>Item Removed From Cart</div>
            )}
            {localCart.length < 1 && (
                <div className='empty-cart-container'>
                    <h1>Your Cart is Empty</h1>
                </div>
            )}
            <ul>
                {localCart.map((each, index) => (
                    <li key={index} className='shadow d-flex flex-direction-row justify-content-between custom-cart-styles'>
                        <div className='d-flex flex-direction-row food-description-cart'>
                            <img src={`http://localhost:3001/foodImages/${each.foodImageUrl}`} className='cart-image'/>
                            <p className='cart-heading'>{each.name}</p>
                        </div>
                        <div>
                            <div>
                                <button type='button' className='add-button-styles' onClick={() => decrement(each)}>-</button>
                                <input placeholder='Quantity' value={each.quantity} readOnly className='cart-quantity-styles' />
                                <button type='button' className='add-button-styles' onClick={() => increment(each)}>+</button>
                            </div>
                            <p>Total Price: ₹{each.totalPrice}</p>
                        </div>
                        <div className='align-self-center'>
                            <button onClick={() => cartDeleteItem(each.id)} className='trash-button-styles'>
                                <IoMdTrash/>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default Cart;
