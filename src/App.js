import React,{useState} from 'react';
import './App.css';
import Header from './Components/Header/Header';
import TopBanner from './Components/TopBanner/TopBanner';
import Foods from './Components/Foods/Foods';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import FeatureTemplate from './Components/FeatureTemplate/FeatureTemplate';
import FoodDetails from './Components/FoodDetails/FoodDetails';
import Login from './Components/Login/Login';
import Shipment from './Components/Shipment/Shipment';
import DoneOrder from './Components/DoneOrder/DoneOrder';
import { AuthProvider, PrivateRoute } from './Components/Login/useAuth';

function App() {
    
    const [cart , setCart] = useState([]);

    const cartHandler = (data) => {
      const alreadyAdded = cart.find(crt => crt.id === data.id );
      const newCart = [...cart,data]
      setCart(newCart);
      if(alreadyAdded){
        const reamingCarts = cart.filter(crt => cart.id !== data);
        setCart(reamingCarts);
      }else{
        const newCart = [...cart,data]
        setCart(newCart);
      }
     
    }

  return (
    <AuthProvider>
      <Router>
        <div className="main">
          <Switch>
            <Route exact path="/">
                <Header cart={cart}></Header>
                <TopBanner></TopBanner>
                <Foods cart={cart}></Foods>
                <FeatureTemplate></FeatureTemplate>
                <Footer></Footer>
            </Route>
            <Route path="/food/:id">
                <Header cart={cart}></Header>
                <FoodDetails cart={cart} cartHandler={cartHandler}></FoodDetails>
                <Footer></Footer>
            </Route>
            <PrivateRoute path="/checkout">
                <Header cart={cart}></Header>
                <Shipment cart={cart}></Shipment>
                <Footer></Footer>
            </PrivateRoute>
            <PrivateRoute path="/order-complete">
              <Header cart={cart}></Header>
              <DoneOrder></DoneOrder>
              <Footer></Footer>
            </PrivateRoute>
            <Route path="/login">
              <Header cart={cart}></Header>
              <Login></Login>
              <Footer></Footer>
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
