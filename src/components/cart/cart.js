import React from 'react';

const Cart = (props)=>{
    return(
        <React.Fragment>
            <div className="cart-header-title">
              <h5 className="m-0 text-center">Cart</h5>
            </div>

            <div className="cart-summary">
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
                        {!props.items.length&&props.noItems}
                        {props.items&&props.items.map((item, index)=>{
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>
                                        <div className="btn-group">
                                        <button className="btn btn-sm btn-success" onClick={()=>props.addQuantityHandler(item)}>+</button> 
                                        <button className="btn btn-outline-success quantity">{item.quantity}</button>
                                        <button className="btn btn-sm btn-success" onClick={()=>props.subtractQuantityHandler(item)}>-</button>
                                        </div>
                                    </td>
                                    <td>${item.priceAfterDiscount}</td>
                                    <td><button className="btn btn-danger btn-sm" onClick={()=>props.removeItemHandler(item)}>Remove</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default Cart;