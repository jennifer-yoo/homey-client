import React, { Component } from 'react';
import CartCard from '../containers/CartCard.js'

export default class CartContainer extends Component {

    // componentDidUpdate(prevProps) {
    //     if(this.props.info !== prevProps.info) {
    //         this.fetchData(this.props.info)
    //     }
    // }

    updateQuantity = () => {
        return <>
            <input id="quantity" name="quantity" type="number" min="1" max="10" value={this.props.quantity} onChange={this.props.changeHandler}/>
            <button className="cart-update-btn">Update</button>
        </>
    }

    renderItems = () => {
        const { info, removeFromCart } = this.props

        let currentCart = [...info]
        let idArray = []
        let objArray = []

        for (const item of currentCart) {
            if (!idArray.includes(item.furniture_id)) {
                let quantityArray = currentCart.filter(el => el.furniture_id === item.furniture_id)
                let quantity = quantityArray.length
                objArray.push(item)
                idArray.push(item.furniture_id)
            }
        }

        console.log("objArray:", objArray)
    }

    orderTotal = () => {
        let prices = this.props.info.map(item => item.furniture.price)
        return prices.reduce((result,num) => result+num)
    }

    render() {    
        console.log("in cart state:", this.props.info)
        return(
            <div className="cart-container">
                <div className="cart">
                    {this.renderItems()}
                    {/* {this.props.info.map(item => 
                        {item.id === item.id ?
                            <><input id="quantity" name="quantity" type="number" min="1" max="10" value={parseInt(this.props.quantity) + parseInt(this.props.quantity)} onChange={this.props.changeHandler}/>
                            <button className="cart-update-btn">Update</button></> :
                            <><input id="quantity" name="quantity" type="number" min="1" max="10" value={this.props.quantity} onChange={this.props.changeHandler}/>
                            <button className="cart-update-btn">Update</button></>       
                        }
                    )} */}
                </div>
                <div className="order-info">
                    {this.props.info.length === 0 ? 
                        <p>There are no items in your cart</p>
                        :
                    <p>Total: ${this.orderTotal()}</p>
                    }
                </div>
            </div>
        )
    }
}