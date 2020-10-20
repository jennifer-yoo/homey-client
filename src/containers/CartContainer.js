import React from 'react';
import CartCard from '../components/CartCard.js'
import { Link } from 'react-router-dom';

function CartContainer(props) {

    const renderItems = () => {
        let currentCart = [...props.info]
        let idArray = []
        let objArray = []

        for (const item of currentCart) {
            if (!idArray.includes(item.furniture_id)) {
                objArray.push(item)
                idArray.push(item.furniture_id)
                
            } else {
                idArray.push(item.furniture_id)
            }
        }
        return objArray.map(foundObj => 
            <CartCard key={foundObj.furniture_id} info={foundObj} cart={currentCart} removeFromCart={props.removeFromCart} updateHandler={props.updateHandler}/>
        )
    }

    const orderTotal = () => {
        let prices = props.info.map(item => item.furniture.price)
        return prices.reduce((result,num) => result+num)
    }

    return (
        <div className="cart-container">
            <><div className="cart">
                <p className="cart-header">Your Cart</p>
                {renderItems()}
            </div>
            <div className="order-info">
                {props.info.length === 0 ? 
                <p className="empty-cart-message">There are no items in your cart</p>
                :
                <div className="order-details">
                    <p className="cart-order-header">Order Information</p>
                    <div className="cart-checkout">
                        <p className="cart-total">Total: ${orderTotal()}</p>
                        <button><Link to="/checkout">Checkout</Link></button>
                    </div>
                </div>
                }
            </div></>
        </div>
    )
}

export default CartContainer