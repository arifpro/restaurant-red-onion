import React from 'react';
import { useForm } from 'react-hook-form';
import {Link} from 'react-router-dom';
import { useAuth } from '../Login/useAuth';
import './Shipment.css';
import { getDatabaseCart, clearLocalShoppingCart } from '../../utilities/databaseManager';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { useState } from 'react';

const Shipment = (props) => {
    const { register, handleSubmit, errors } = useForm()
    const [deliveryDetails , setDeliverDetails] = useState(null)
    const [orderId, setOrderId] = useState(null)
    const stripePromise = loadStripe('pk_test_znHQ0gyFkHh9VMuP3eOrHxg900c82LQBM1');

    
    const auth = useAuth()

    const handlePlaceOrder = (payment) => {
        // TODO: User move this after payment
        console.log(auth.user.email);
        const savedCart = getDatabaseCart()
        const orderDetails = {
            email: auth.user.email,
            cart: savedCart,
            shipment: deliveryDetails,
            payment: payment
        }
        fetch('https://red-onion-restaurant.herokuapp.com/placeOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(order => {
                setOrderId(order._id)
                clearLocalShoppingCart()
            })
    }

    
    const onSubmit = data => setDeliverDetails(data);

    const subTotal = props.cart.reduce((acc,crr) => {
        return acc + (crr.price * crr.quantity) ;
    },0)
    const totalQuantity = props.cart.reduce((acc,crr) => {
        return acc + crr.quantity ;
    },0)
    const setRoadNum = () => {
        const getRoadNum = document.getElementById("getRoadNum").value
        const getFlatNum = document.getElementById("getFlatNum").value
        const getAddress = document.getElementById("getAddress").value

        
        console.log(getRoadNum);
        
        document.getElementById("roadNum").innerText = getRoadNum + ", " + getFlatNum + ", " + getAddress
    }

    
    const tax = (subTotal / 100) * 5;
    const deliveryFee = totalQuantity && 2;
    const grandTotal = subTotal + tax + deliveryFee;
    return (
        <div className="shipment container my-5">
            <div className="row">
                <div className="col-md-5">
                    <div style={{ display: deliveryDetails && 'none' }}>
                        <h4>Edit Delivery Details</h4>
                        <hr />
                        <form onSubmit={handleSubmit(onSubmit)} className="py-5">

                            <div className="form-group">
                                <input name="todoor"
                                    className="form-control"
                                    ref={register({ required: true })}
                                    placeholder="Deliver To Door"
                                    defaultValue="Deliver To Door"
                                />
                                {
                                    errors.todoor && <span className="error">Place is required</span>
                                }
                            </div>
                            <div className="form-group">
                                <input name="road"
                                    id="getRoadNum"
                                    className="form-control"
                                    ref={register({ required: true })}
                                    placeholder="Road No"
                                />
                                {
                                    errors.road && <span className="error">Road No is required</span>
                                }
                            </div>
                            <div className="form-group">
                                <input name="flat"
                                    id="getFlatNum"
                                    className="form-control"
                                    ref={register({ required: true })}
                                    placeholder="Flat, suite or floor"
                                />
                                {
                                    errors.flat && <span className="error">Flat, Suite or Floor is required</span>
                                }
                            </div>
                            <div className="form-group">
                                <input name="businessname"
                                    className="form-control"
                                    ref={register({ required: true })}
                                    placeholder="Business Name"
                                />
                                {
                                    errors.businessname && <span className="error">Business name is required</span>
                                }
                            </div>
                            <div className="form-group">
                                <textarea name="address"
                                    id="getAddress"
                                    ref={register({ required: true })}
                                    placeholder="Add Delivery Address"
                                    className="form-control"
                                    cols="30"
                                    rows="2"
                                ></textarea>
                                {
                                    errors.address && <span className="error">Delivery address is required</span>
                                }
                            </div>

                            <div className="form-group">
                                <button className="btn btn-danger btn-block" type="submit" onClick={setRoadNum}>Save & Continue</button>
                            </div>
                        </form>
                    </div>
                    <div style={{ marginTop: '0px', display: deliveryDetails ? 'block' : 'none' }}>
                        <h3>Payment Information</h3>
                        <hr />
                        <Elements stripe={stripePromise}>
                            <CheckoutForm handlePlaceOrder={handlePlaceOrder} />
                        </Elements>
                        <br />
                        {
                            orderId && <div>
                                <h3>Thank you for shopping with us</h3>
                                <p>Your order id is: {orderId}</p>
                            </div>
                        }
                    </div>
                </div>
                <div className="offset-md-2 col-md-5" style={{ marginTop: '100px'}}>
                    <div className="restaurant-info mb-5">
                        <h4>Form <strong> Gulshan Plaza Restaura GPR</strong></h4>
                        <h5>Arriving in 20-30 min</h5>
                        <h5><span id="roadNum"> 107 Rd No 8</span></h5>
                    </div>
                   
                    {
                        props.cart.map(item => 
                            <div className="single-checkout-item mb-3 bg-light rounded d-flex align-items-center justify-content-between p-3">
                                <img width="100px" src={item.img[0]} alt=""/>
                                <div className="">
                                    <h6>{item.name}</h6>
                                    <h4 className="text-danger">${item.price.toFixed(2)}</h4>
                                    <p>Delivery free</p>
                                </div>
                                <div className="cart-controller ml-3 btn">
                                    <button className="minusBtn1" onClick={item.quantity - 1}>-</button> 
                                    <span>{item.quantity}</span>  
                                    <button className="plusBtn1" >+</button>
                                </div>
                            </div>
                            
                        )
                    }
                  
                    <div className="cart-calculation">
                        <p className="d-flex justify-content-between">
                            <span>Sub Total . {totalQuantity} Item</span> <span>${subTotal.toFixed(2)}</span>
                        </p>
                        <p className="d-flex justify-content-between">
                            <span>Tax</span> <span>${tax.toFixed(2)}</span>
                        </p>
                        <p className="d-flex justify-content-between">
                            <span>Delivery Fee</span> <span>${deliveryFee}</span>
                        </p>
                        <p className="h5 d-flex justify-content-between">
                            <span>Total</span> <span>${grandTotal.toFixed(2)}</span>
                        </p>
                        {
                        deliveryDetails ? 
                        <Link to="/order-complete">
                            <button  className="btn btn-block btn-danger btn-secondary">Check Out Your Food</button>
                        </Link>
                        :
                        <button disabled className="btn btn-block btn-secondary">Check Out Your Food</button>
                        
                    }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipment;