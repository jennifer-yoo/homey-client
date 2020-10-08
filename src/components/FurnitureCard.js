import React, { Component } from 'react';

export default class FurnitureCard extends Component {

    state = {
        quantity: 1
    }

    changeHandler = (event) => {
        event.persist()
        this.setState(()=> ({[event.target.name]: event.target.value}))
    }

    render () {
        const { id, room, category, price, name, color, rating, image} = this.props.info
        
        return (
            <div className="item-card">
                <div className="item-info">
                    <img className="card-pic" src={image} alt={name}></img>
                    <p>{name}</p>
                    <p>${price}</p>
                    <p>{rating} out of 5</p>
                    <form className="add-form" onSubmit={(event) => this.props.addToCart(this.props.info, event, this.state.quantity)}>
                        <label htmlFor="quantity">Quantity</label>
                        <input id="quantity" name="quantity" type="number" min="1" max="10" value={this.state.quantity} onChange={this.changeHandler}/>
                        <button className="add-cart-btn" type="submit">Add to Cart</button>
                    </form>
                </div>
            </div>
        )
    }
}