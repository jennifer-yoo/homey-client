import React, { Component } from 'react';

export default class FurnitureShow extends Component {

    state = {
        quantity: 1
    }

    changeHandler = (event) => {
        event.persist()
        event.preventDefault()
        this.setState(()=> ({[event.target.name]: event.target.value}))
    }

    render () {
        const { info, addToCart } = this.props
        return (
            <div className="show-card">
                {info ? 
                    <div className="show-info">
                        <div>
                            <img className="show-pic" src={info.image} alt={info.name}></img>
                        </div>
                        <div className="text-info">
                            <p className="text-name">{info.name}</p>
                            <p>${info.price}</p>
                            <p>{info.rating} out of 5</p>
                            <form className="add-form" onSubmit={(event) => addToCart(info, event, this.state.quantity)}>
                                <label htmlFor="quantity">Quantity</label>
                                <input id="quantity" name="quantity" type="number" min="1" max="3" value={this.state.quantity} onChange={(event) => this.changeHandler(event)}/>
                                <button className="add-cart-btn" type="submit">Add to Cart</button>
                            </form>
                        </div>
                    </div>
                : 
                null
                }
            </div>
        )
    }
}