import React, { useState } from 'react';
import { useEffect } from 'react';
import './FeatureTemplate.css';
// import AllFeatures from '../../foodData/features'
import SingleFeature from '../SingleFeature/SingleFeature';

function FeatureTemplate(props) {
    const [features , setFeatures] = useState([]);

    // useEffect(() => {
    //     setFeatures(AllFeatures);
    // }, []);

    useEffect(() => {
        fetch('https://red-onion-restaurant.herokuapp.com/allFeatures')   //products
            .then(res => res.json())
            .then(data => {
                // console.log("data from mongodb", data);
                setFeatures(data)
            })
    }, [])

    return (
        <section className="features my-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-6">
                            <h2>Why you choose us</h2>
                                <p className="mt-3 mb-5">Barton waited twenty always repair in within we do. An delighted offending curiosity my is basswoods at. Boy prosperous increasing surrounded.</p>
                            </div>
                        </div>
                    </div>

                    {
                        features.map( feature => <SingleFeature key={feature.id} feature={feature}></SingleFeature>)
                    }
                    
                </div>
            </div>
        </section>
    );
}

export default FeatureTemplate;