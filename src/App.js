import React from 'react';
import './App.css';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import placeholder from './assets/images/placeholder.png';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      cartData: [],
      items: [],
      totalItems: 0,
      totalPrice: 0,
      totalDiscount: 0
    }
  }

  componentDidMount(){
    this.getCartData();
  }

  getCartData(){
    axios.get('https://api.myjson.com/bins/qhnfp')
    .then((res)=>{
      res.data.map((item)=>item.quantity=1);
      this.setState({
        cartData: [...res.data]
      })
    })
    .catch((err)=>{
      console.log('error', err);
    })
  }

  addItemToCart(item, discount=0){
    console.log('item', item);
    item.discountAmount = discount;
    item.priceBeforeDiscount = item.price;
    item.priceAfterDiscount = item.price - discount;
    
    let isExist = false;
    this.state.items.map((itm)=>{
      if(itm.id===item.id){
        isExist = true;
      }
      return true;
    })

    if(!isExist){
      this.setState({
        items: this.state.items.concat([item]),
        totalItems: this.state.items.length + 1,
        totalPrice: this.state.totalPrice + item.priceBeforeDiscount,
        totalDiscount: this.state.totalDiscount + discount
      });
    }else{
      // alert('already exist');
      this.addQuantity(item);
    }
    console.log(this.state.items);
  }

  // remove item from cart
  removeItem(item){
    // item.quantity = 1;
    this.setState({
      items: this.state.items.filter((itm)=>itm.id!==item.id),
      totalItems: this.state.items.length - 1,
      totalPrice: this.state.totalPrice - (item.price*item.quantity),
      totalDiscount: this.state.totalDiscount - (item.discountAmount*item.quantity)
    })
    item.quantity = 1;
    console.log(this.state.items);
  }

  // add quantity
  addQuantity(item){
    console.log(this.state.items);

    this.setState(prevState => {
      let itemsCopy = Object.assign([], prevState.items);  // creating copy of state variable jasper
      
      itemsCopy.map((itm)=>{
        if(itm.id === item.id){
          itm.quantity++;
          itm.priceAfterDiscount = (itm.price-itm.discountAmount)*itm.quantity;
          item.priceBeforeDiscount = itm.price*itm.quantity;
        }
        return true;
      })
      return { 
        items: itemsCopy,
        totalPrice: this.state.totalPrice + item.price,
        totalDiscount: this.state.totalDiscount + item.discountAmount
      };
    })
    console.log('item add', this.state.items);
  }

  // subtract quantity
  subtractQuantity(item){
    this.setState(prevState => {
      let itemsCopy = Object.assign([], prevState.items);  // creating copy of state variable jasper
      
      itemsCopy.map((itm)=>{
        if(itm.id === item.id){
          itm.quantity--;
          itm.priceAfterDiscount = (itm.price-itm.discountAmount)*itm.quantity;
          item.priceBeforeDiscount = itm.price*itm.quantity;
          if(itm.quantity < 1){
            itemsCopy = itemsCopy.filter((itm)=>itm.id!==item.id);
            itm.quantity = 1;
          }
          console.log('itm', itm);
        }
        return true;
      })

      return { 
        items: itemsCopy,
        totalItems: itemsCopy.length,
        totalPrice: this.state.totalPrice - item.price,
        totalDiscount: this.state.totalDiscount - item.discountAmount
      };
    })
  }

  render(){
    const {cartData, items, totalItems, totalPrice, totalDiscount} = this.state;
    const noItems = <tr><td className="text-center" colSpan="4">No items added</td></tr>;
    return(
      <>
        <div className="cart-App">  
          <div className="container">
            <h1 className="cart-title">Cart App</h1>

            <div className="cart-header-title">
              <h5 className="m-0 text-center">Cart</h5>
              {/* <button className="btn btn-primary btn-sm">Go To Cart</button> */}
            </div>
            <div className="order-summary">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Items</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {!items.length&&noItems}
                  {items&&items.map((item, index)=>{
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>
                          <div className="btn-group">
                            <button className="btn btn-sm btn-success" onClick={()=>this.addQuantity(item)}>+</button> 
                            <button className="btn btn-outline-success quantity">{item.quantity}</button>
                            <button className="btn btn-sm btn-success" onClick={()=>this.subtractQuantity(item)}>-</button>
                          </div>
                        </td>
                        <td>${item.priceAfterDiscount}</td>
                        <td><button className="btn btn-danger btn-sm" onClick={()=>this.removeItem(item)}>Remove</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>            

            <div className="row">
            {/* items grid */}
              <div className="col-md-8">
                <div className="cart-header-title">
                  <h5 className="m-0 text-center">All Items</h5>
                  {/* <button className="btn btn-primary btn-sm">Go To Cart</button> */}
                </div>
                <div className="row">
                  {cartData.map((item, index)=>{
                    const discount = (item.price*item.discount)/100;
                    return(
                      <div className="col-md-6" key={index}>
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
                                  {item.discount ? <span className="text-muted ml-2 price">${item.price-discount}</span>:''}
                                </div>
                                <button className="btn btn-outline-primary btn-sm" onClick={()=>this.addItemToCart(item, discount)}>Add To Cart</button>
                              </div>
                          </div>
                        </div>  
                      </div>
                    )
                  })}
                  </div>
                </div>
                {/* /items grid */}

                {/* order summary */}
                <div className="col-md-4">
                  <div className="cart-header-title">
                    <h5 className="m-0 text-center">checkout</h5>
                    {/* <button className="btn btn-primary btn-sm">Go To Cart</button> */}
                  </div>
                  <div className="checkout">
                    <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <p>Items({totalItems})</p>
                            <p>${totalPrice}</p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p>Discount</p>
                            <p>-${totalDiscount}</p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p>Type Discount</p>
                            <p>-$0</p>
                          </div>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            <p className="m-0">Order Total</p>
                            <h5 className="m-0">${totalPrice - totalDiscount}</h5>
                        </div>
                    </div>
                  </div>
                </div>
                {/* /order summary */}
              </div>
          </div>  
        </div>
      </>
    )
  }
}



export default App;
