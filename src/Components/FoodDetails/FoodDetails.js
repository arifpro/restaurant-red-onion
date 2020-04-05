import React , { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './FoodDetails.css';
import allFoods from '../../foodData';
import { useParams, Link } from 'react-router-dom';



const FoodDetails = (props) => {
    const {id} = useParams();
    const [quantity, setQuantity] = useState(1);
    // console.log(id, " ", typeof id);
    
    

    const [currentFood, setCurrentFood] = useState([]);
    useEffect(() => {
        const url = 'https://red-onion-restaurant.herokuapp.com/food/' + id
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log("data from mongodb", data);
                setCurrentFood(data)
            })
    }, [])


    
    // setCurrentFood(allFoods.find(food => food.id == id))
    // console.log( allFoods[0]);
    // console.log( foods[0]);

    // const currentFood = allFoods.find(food=> food.id == id);

    console.log(currentFood);

    
    useState(() => {
        if (currentFood.quantity){
            setQuantity(currentFood.quantity)
        }
    }, [currentFood.quantity])


    
    const finalCartHandler = (currentFood) => {
        currentFood.quantity = quantity;
        props.cartHandler(currentFood);
    }

    return (
        <div className="food-details my-5 container">
            {/* <nav>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <span>Breakfast</span>
                    </li>
                    <li className="nav-item">
                        <span>Lunch</span>
                    </li>
                    <li className="nav-item">
                        <span >Dinner</span>
                    </li>
                </ul>
            </nav> */}
            <div className="row">
                <div className="col-md-6 pr-md-4">
                    <h1><strong>{currentFood.name}</strong></h1>
                    <p className="my-5 desc">{currentFood.description}</p>
                    <div className="d-flex  my-4">
                        <h2 className="price"><strong>${(currentFood.price).toFixed(2)}</strong></h2>
                        
                        <div className="d-flex align-items-center">
                        <div className="cart-controller ml-3 btn">
                            <button 
                                className="minusBtn" 
                                onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}
                            >
                            <strong>-</strong>    
                            </button>
                                <span className="quantity">{quantity}</span> 
                            <button 
                                className="plusBtn" 
                                onClick={() => setQuantity(quantity + 1)}
                            >
                            <strong>+</strong>
                            </button>
                            {/* <button id="minusBtn">
                                <span>-</span>
                            </button>
                            <input id="quantity" type="text" class="text-center" value="1" />
                            <button id="plusBtn">+</button> */}
                        </div>
                        </div>
                    </div>
                    <Link to="/">
                        <button 
                            className="btn btn-danger btn-rounded mb-2" 
                            onClick={() => finalCartHandler(currentFood)}
                            // onClick={() => props.cartHandler(props.product)}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} /> Add
                        </button>
                    </Link>

                    <div className="more-images mt-5 ">
                        {currentFood.img.map(img=> <img className="mr-4" height="150px" src={img} alt=""/>)}
                    </div>
                </div>
                <div className="col-md-6">
                    <img className="img-fluid" src={currentFood.img[0]} alt=""/>
                </div>

            </div>
        </div>
    );
};

export default FoodDetails;