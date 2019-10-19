import React from 'react';
import './App.css';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Listing from './components/listing/listing';
import OrderSummary from './components/orderSummary/orderSummary';
import Cart from './components/cart/cart';

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
      console.log('error', err.message);
    })
  }

  addItemToCart(item, discount=0){
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
  }

  // add quantity
  addQuantity(item){

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
            <Cart items={items} noItems={noItems} addQuantityHandler={(item)=>this.addQuantity(item)} subtractQuantityHandler={(item)=>this.subtractQuantity(item)} removeItemHandler={(item)=>this.removeItem(item)} />
            <div className="row">
              <Listing cartData={cartData} handleAddItemToCart={(item,discount)=>this.addItemToCart(item, discount)} />
              <OrderSummary orderData={{totalItems,totalDiscount,totalPrice}}/>
            </div>
          </div>  
        </div>
      </>
    )
  }
}



export default App;
