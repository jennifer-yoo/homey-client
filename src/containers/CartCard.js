import React, { Component } from 'react';

export default class CartCard extends Component {

    state = {
        quantity: null
    }

    render () {
        return (
            <div className="cart-item">
                {/* <img className="card-pic" src={item.furniture.image} alt={item.furniture.name}></img>
                <p>{item.furniture.name}</p>
                <p>${item.furniture.price}</p>
                <button className="cart-remove-btn" onClick={() => removeFromCart(item.furniture)}>Remove</button>
                <input id="quantity" name="quantity" type="number" min="1" max="10" value={this.state.quantity} onChange={this.props.changeHandler}/>
                <button className="cart-update-btn">Update</button> */}
            </div> 
        )
    }
}