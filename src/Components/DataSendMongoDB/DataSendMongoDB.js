import React from 'react';
import fakeData from '../../foodData'
import AllFeatures from '../../foodData/features'

const DataSendMongoDB = () => {
    // const handleAddInventory = () => {
    //     fetch('http://localhost:4300/addProducts', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': "application/json"
    //         },
    //         body: JSON.stringify(AllFeatures)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log('post successful', data);
    //     })
    // }
    return (
        <div>
            {/* <button onClick={handleAddInventory}>Add Inventory</button> */}
        </div>
    );
};

export default DataSendMongoDB;