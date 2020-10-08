import React, { Component } from 'react';

export default class CartContainer extends Component {

    renderItem = () => {
        return this.props.info.map(item => 
            <div className="cart-item">
                <img className="card-pic" src={item.furniture.image} alt={item.furniture.name}></img>
                <p>{item.furniture.name}</p>
                <p>${item.furniture.price}</p>
                <button className="cart-remove" onClick={() => this.props.removeFromCart(item.furniture)}>Remove</button>
            </div>
        )
    }

    orderTotal = () => {
        let prices = this.props.info.map(item => item.price)
        return prices.reduce((result,num) => result+num)
    }

    render() {    
        console.log(this.props.info)
        return(
            <>
                <div className="cart">
                    {this.renderItem()}
                </div>
                <div className="order-info">
                    {this.props.info.length === 0 ? 
                        <p>There are no items in your cart</p>
                        :
                        <p>Total: {this.orderTotal()}</p>
                    }
                </div>
            </>
        )
    }
}