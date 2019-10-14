import React from 'react';
import './App.css';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import placeholder from './assets/images/placeholder.png';
// import logo from './logo.svg';



class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      cartData: []
    }
  }

  componentDidMount(){
    this.getCartData();
  }

  getCartData(){
    axios.get('https://api.myjson.com/bins/qhnfp')
    .then((res)=>{
      console.log('cart response', res.data);
      this.setState({
        cartData: [...res.data]
      })
    })
    .catch((err)=>{
      console.log('error', err);
    })
  }

  render(){
    const {cartData} = this.state;
    return(
      <>
      
        <div className="cart-App">  
          <div className="container">
          <h1 className="cart-title">Cart App</h1>
            <div className="cart-header">
              <h5 className="m-0">All Items</h5>
              <button className="btn btn-primary btn-sm">Go To Cart</button>
            </div>


            <div className="order-summary">
              <div className="row">
                <div className="col-md-8">
                  <table className="table table-bordered table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Items</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Item 1</td>
                        <td>1</td>
                        <td>$750</td>
                        <td><button className="btn btn-danger btn-sm">Remove</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-4">
                  <div className="checkout">
                    <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <p>Items(4)</p>
                            <p>$1070</p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p>Discount</p>
                            <p>-$128.5</p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p>Type Discount</p>
                            <p>-$0</p>
                          </div>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            <p className="m-0">Order Total</p>
                            <h5 className="m-0">$941.5</h5>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="row">
              {cartData.map((item, index)=>{
                const discountPrice = (item.price)-(item.price*item.discount)/100;
                return(
                  <div className="col-md-4" key={index}>
                    <div className="card-deck">
                      <div className="card">
                          <div className="card-img" style={{backgroundImage: `url(${placeholder})`}}>
                            {item.discount&&<span className="discount">{item.discount}% OFF</span>}
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                          </div>
                          <div className="card-footer">
                            <div>
                              <small className={`text-muted ${item.discount?'line-through':'price'}`}>${item.price}</small>
                              {item.discount ? <span className="text-muted ml-2 price">${discountPrice}</span>:''}
                            </div>
                            <button className="btn btn-outline-primary btn-sm">Add To Cart</button>
                          </div>
                      </div>
                    </div>  
                  </div>
                )
              })}
              </div>
          </div>  
        </div>
      </>
    )
  }
}



export default App;
