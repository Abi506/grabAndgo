import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItems, addItems } from '../../slices/cartSlice';
import { Container } from 'react-bootstrap';
import RazorPay from '../razorPay/razorPay';
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

    const updateQuantityInCart = (id, newQuantity) => {
        const item = localCart.find(item => item.id === id);
        if (item) {
            dispatch(addItems({
                id,
                quantity: newQuantity,
                price: item.price,
                name: item.name,
                foodImageUrl: item.foodImageUrl,
                totalPrice: newQuantity * item.price
            }));
        }
    };

    const increment = (selectedFood) => {
        const newQuantity = selectedFood.quantity + 1;
        setLocalCart(prevCart => {
            const updatedCart = prevCart.map(item => {
                if (item.id === selectedFood.id) {
                    return { ...item, quantity: newQuantity, totalPrice: newQuantity * item.price };
                }
                return item;
            });
            return updatedCart;
        });
        updateQuantityInCart(selectedFood.id, newQuantity);
    };

    const decrement = (selectedFood) => {
        const newQuantity = selectedFood.quantity > 1 ? selectedFood.quantity - 1 : 1;
        setLocalCart(prevCart => {
            const updatedCart = prevCart.map(item => {
                if (item.id === selectedFood.id) {
                    return { ...item, quantity: newQuantity, totalPrice: newQuantity * item.price };
                }
                return item;
            });
            return updatedCart;
        });
        updateQuantityInCart(selectedFood.id, newQuantity);
    };

    const cartDeleteItem = (id) => {
        dispatch(deleteItems(id));
        setAlert(true);
        setTimeout(() => setAlert(false), 3000);
    };

    // Calculate total amount
    const totalAmount = localCart.reduce((acc, item) => acc + item.totalPrice, 0);

    return (
        <>
        {showAlert && (
            <div className='alert alert-warning mt-4 w-75 align-self-center'>Item Removed From Cart</div>
        )}
        <Container className='custom-container'>
            
            {localCart.length < 1 && (
                <div className='empty-cart-container'>
                    <h1>Your Cart is Empty</h1>
                </div>
            )}
            <ul className='cart-ul'>
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
                            <p style={{fontSize:"18px",fontWeight:"600",fontFamily:"'Graphik', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"}}>₹{each.totalPrice}</p>
                        </div>
                        <div className='align-self-lg-center trash-button-mobile'>
                            <button onClick={() => cartDeleteItem(each.id)} className='trash-button-styles'>                                    
                                <div className='btn btn-close'>
                                    
                                </div>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {localCart.length > 0 && (
                <div className='checkout-summary mt-4'>
                    <h3>Checkout Summary</h3>
                    <table className='checkout-table'>
                        
                            <tr className='table-head-styles'>
                                <th>Item</th>
                                <th>Price</th>
                            </tr>
                        
                        <tbody>
                            {localCart.map(item => (
                                <tr key={item.id} className='table-body-styles'>
                                    <td>{item.name}</td>
                                    <td>₹{item.totalPrice}</td>
                                </tr>
                            ))}
                            <tr className='table-body-styles-total-amount'>
                                <td>Total Amount:</td> 
                                <td>₹{totalAmount}</td>
                            </tr>
                        </tbody>

                    </table>
                    <RazorPay totalAmount={totalAmount}/>
                </div>
            )}
        </Container>
        </>
    );
};

export default Cart;
