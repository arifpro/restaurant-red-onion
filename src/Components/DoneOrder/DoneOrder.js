import React from 'react';
import MapImg from '../../Images/ordercomplete.png';
import Rider from '../../Images/Image/rider.png';
import RiderHalmet from '../../Images/Image/helmet.png';
import { useAuth } from '../Login/useAuth';
const DoneOrder = () => {
    const auth = useAuth();
    console.log(auth);
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-8">
                    <img className="img-fluid" src={MapImg} alt="" />
                </div>
                <div className="col-md-4 pl-md-5">
                    <div className="bg-light p-3 rounded">
                        <img className="w-25 ml-5" src={Rider} alt="" />
                        <div className="bg-white  rounded p-3 my-3">
                            <div>
                                <h5>Your Location</h5>
                                <p>107 Rd no 8</p>
                            </div>
                            <div>
                                <h5>Shop Address</h5>
                                <p>Gulshan Plaza Restaura GPR</p>
                            </div>
                        </div>
                        <h1>09:00</h1>
                        <p>Estimated Delivery</p>

                        <div className="bg-white rounded p-3 d-flex">
                            <img className="w-25 mr-2" src={RiderHalmet} alt="" />
                            <div>
                                <h6>Hamim</h6>
                                <p>Your Rider</p>
                            </div>
                        </div>
                        <div>
                            <br/>
                            <h6>You: {auth.user ? auth.user.displayName : ""}</h6>
                        </div>

                        <button className="btn btn-block my-3 btn-danger">Contact</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoneOrder;