import React, { useState } from 'react';

const RazorPay = ({ totalAmount }) => {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
   
    const handlePayment = (e) => {
        e.preventDefault();
        if (totalAmount === "") {
            alert("Please enter an amount");
        } else {
            let options = {
                key: "rzp_test_lBQ2u8IP2EFHR7",
                amount: totalAmount * 100,
                currency: "INR",
                name: "Grab & Go",
                description: "Cart Checkout",
                handler: function (response) {
                    setPaymentSuccess(true);
                    console.log("Payment Response:", response);
                },
                prefill: {
                    name: "Abinandhan",
                    email: 'abinandhan812@gmail.com',
                    contact: "8122441574"
                },
                notes: {
                    address: "Razorpay Corporate office"
                },
                theme: {
                    color: "#00A877"
                },
            };
            let pay = new window.Razorpay(options);
            pay.open();
        }
    };

    return (
        <div>
            <button type='button' className='btn btn-success w-100' onClick={handlePayment}>
                Pay with UPI
            </button>
            {paymentSuccess && (
                <div className='alert alert-success mt-3' role="alert">
                    Payment Successful
                </div>
            )}
        </div>
    );
};

export default RazorPay;
