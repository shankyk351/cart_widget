import React from 'react';

const OrderSummary = (props)=>{
    return(
        <React.Fragment>
            {/* order summary */}
            <div className="col-md-4">
                <div className="cart-header-title">
                    <h5 className="m-0 text-center">checkout</h5>
                </div>
                <div className="checkout">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <p>Items({props.orderData.totalItems})</p>
                                <p>${props.orderData.totalPrice}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Discount</p>
                                <p>-${props.orderData.totalDiscount}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Type Discount</p>
                                <p>-$0</p>
                            </div>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            <p className="m-0">Order Total</p>
                            <h5 className="m-0">${props.orderData.totalPrice - props.orderData.totalDiscount}</h5>
                        </div>
                    </div>
                </div>
            </div>
            {/* /order summary */}
        </React.Fragment>
    )
}

export default OrderSummary;