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
                <><h2>Your Cart</h2>
                    <div className="cart">
                        {renderItems()}
                    </div>
                    <div className="order-info">
                        {props.info.length === 0 ? 
                            <p>There are no items in your cart</p>
                            :
                            <><p>Total: ${orderTotal()}</p>
                            <Link to="/checkout">Continue to Checkout</Link></>
                        }
                </div></>
            </div>
    )
}

export default CartContainer