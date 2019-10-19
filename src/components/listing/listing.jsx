import React from 'react';
import placeholder from './../../assets/images/placeholder.png';

const Listing = (props)=>{
    
    return(
        <React.Fragment>

            {/* items grid */}
            <div className="col-md-8">
                <div className="cart-header-title">
                  <h5 className="m-0 text-center">All Items</h5>
                </div>
                <div className="row">
                  {props.cartData.map((item, index)=>{
                    const discount = (item.price*item.discount)/100;
                    return(
                      <div key={index} className="col-md-6">
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
                                    <button className="btn btn-outline-primary btn-sm" onClick={()=>props.handleAddItemToCart(item, discount)}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    )
                  })}
                </div>
            </div>
            {/* /items grid */}
        </React.Fragment>
    )
}

export default Listing;