import React, { Component } from 'react';

export default class CartCard extends Component {

    state = {
        quantity: ""
    }

    componentDidMount() {
        let cartItem = this.props.cart.filter(el => el.furniture_id === this.props.info.furniture_id)
        let count = cartItem.length
        this.setState({ quantity: count})
    }

    changeHandler = (event) => {
        event.persist()
        event.preventDefault()
        this.setState(()=> ({[event.target.name]: event.target.value}))
    }

    render () {
        console.log("cartcard:", this.props.info)
        const { info, removeFromCart, updateHandler } = this.props
        
        return (
            
            <div className="cart-item">
            {info ? 
                <><img className="card-pic" src={info.furniture.image} alt={info.furniture.name}></img>
                <p>{info.furniture.name}</p>
                <p>${info.furniture.price}</p>
                <button className="cart-remove-btn" onClick={() => removeFromCart(info)}>Remove</button>
                <form className="update-form" onSubmit={(event) => updateHandler(info, event, this.state.quantity)}>
                    <label htmlFor="quantity">Quantity</label>
                    <input id="quantity" name="quantity" type="number" min="1" max="3" value={this.state.quantity} onChange={this.changeHandler}/>
                    <button className="cart-update-btn">Update</button>
                </form></>
                :
                null
            }
            </div> 
        )
    }
}