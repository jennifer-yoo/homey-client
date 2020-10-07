import React, { Component } from 'react';

export default class FurnitureCard extends Component {

    // renderItem = () => {
    //     return this.props.info.map(item => 
    //         <div className="item-card">
    //             <div className="item-info">
    //                 <img className="card-pic" src={item.image} alt={item.name}></img>
    //                 <p>{item.name}</p>
    //                 <p>${item.price}</p>
    //                 <p>{item.rating} out of 5</p>
    //                 <button className="add-cart-btn" onClick={() => this.props.addToCart(item.id)}>Add to Cart</button>
    //             </div>
    //         </div>
    //     )
    // }

    // render() {
    //     return (
    //         <div>
    //             {this.renderItem()}
    //         </div>
    //     )
    // }


    render () {
        const { id, room, category, price, name, color, rating, image} = this.props.info
        
        return (
            <div className="item-card">
                <div className="item-info">
                    <img className="card-pic" src={image} alt={name}></img>
                    <p>{name}</p>
                    <p>${price}</p>
                    <p>{rating} out of 5</p>
                    <button className="add-cart-btn" onClick={() => this.props.addToCart(id)}>Add to Cart</button>
                </div>
            </div>
        )
    }
}