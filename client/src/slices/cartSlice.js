import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItems: (state, action) => {
            const { id, quantity, price, name, foodImageUrl } = action.payload;
            const itemIndex = state.cart.findIndex(each => each.id === id);

            if (itemIndex !== -1) {
                // If the item exists, set its new quantity and update the total price
                state.cart[itemIndex].quantity = quantity;
                state.cart[itemIndex].totalPrice = state.cart[itemIndex].quantity * state.cart[itemIndex].price;
            } else {
                // If the item does not exist, add it to the cart
                state.cart.push({
                    id,
                    quantity,
                    price,
                    foodImageUrl,
                    totalPrice: quantity * price, // Calculate total price
                    name
                });
            }
        },
        deleteItems: (state, action) => {
            state.cart = state.cart.filter(eachItem => eachItem.id !== action.payload);
        }
    }
});

export const { addItems, deleteItems } = cartSlice.actions;

export default cartSlice.reducer;
