import React, { Component } from 'react';

export default class CartContainer extends Component {

    updateQuantity = () => {
        return <>
            <input id="quantity" name="quantity" type="number" min="1" max="10" value={this.props.quantity} onChange={this.props.changeHandler}/>
            <button className="cart-update-btn">Update</button>
        </>
    }

    renderItem = () => {
        return this.props.info.map(item => 
            <div className="cart-item">
                <img className="card-pic" src={item.image} alt={item.name}></img>
                <p>{item.name}</p>
                <p>${item.price}</p>
                <button className="cart-remove-btn" onClick={() => this.props.removeFromCart(item)}>Remove</button>
                {item.id === item.id ?
                    <><input id="quantity" name="quantity" type="number" min="1" max="10" value={parseInt(this.props.quantity) + parseInt(this.props.quantity)} onChange={this.props.changeHandler}/>
                    <button className="cart-update-btn">Update</button></> :
                    <><input id="quantity" name="quantity" type="number" min="1" max="10" value={this.props.quantity} onChange={this.props.changeHandler}/>
                    <button className="cart-update-btn">Update</button></>       
                }
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
                        <p>Total: {this.orderTotal()}</p>
                    }
                </div>
            </div>
        )
    }
}