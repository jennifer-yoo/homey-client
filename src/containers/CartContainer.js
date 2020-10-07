import React, { Component } from 'react';

export default class CartContainer extends Component {

    render() {
        // const { id, room, category, price, name, color, rating, image} = this.props.info
    
        console.log(this.props.info)
        return(
            <div className="cart">
                <p>{this.props.info.name}</p>
            </div>
        )
    }
}