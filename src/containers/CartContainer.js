import React, { Component } from 'react';

export default class CartContainer extends Component {

    updateQuantity = () => {
        return <>
            <input id="quantity" name="quantity" type="number" min="1" max="10" value={this.props.quantity} onChange={this.props.changeHandler}/>
            <button className="cart-update-btn">Update</button>
        </>
    }

    renderItem = () => {
        const { info, quantity, removeFromCart } = this.props

        let num = parseInt(quantity)

        if (num === 1) {
            return info.map(item =>
                <div className="cart-item">
                    <img className="card-pic" src={item.furniture.image} alt={item.furniture.name}></img>
                    <p>{item.furniture.name}</p>
                    <p>${item.furniture.price}</p>
                    <button className="cart-remove-btn" onClick={() => removeFromCart(item.furniture)}>Remove</button>
                    <input id="quantity" name="quantity" type="number" min="1" max="10" value={parseInt(quantity)} onChange={this.props.changeHandler}/>
                    <button className="cart-update-btn">Update</button>
                </div> 
            )
        } else if (num > 1 || num < 3) {
            return info[0].map(item => 
                <div className="cart-item">
                    <img className="card-pic" src={item.furniture.image} alt={item.furniture.name}></img>
                    <p>{item.furniture.name}</p>
                    <p>${item.furniture.price}</p>
                    <button className="cart-remove-btn" onClick={() => removeFromCart(item.furniture)}>Remove</button>
                    <input id="quantity" name="quantity" type="number" min="1" max="10" value={parseInt(quantity)} onChange={this.props.changeHandler}/>
                    <button className="cart-update-btn">Update</button>
                </div> 
            )
        } else {
            return null
        }
    }

    orderTotal = () => {
        let prices = this.props.info.map(item => item.furniture.price)
        return prices.reduce((result,num) => result+num)
    }

    render() {    
        console.log(this.props.info)
        return(
            <div className="cart-container">
                <div className="cart">
                    {this.renderItem()}
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
                        <p>Total: </p>
                    }
                </div>
            </div>
        )
    }
}