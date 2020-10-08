import React, { Component } from 'react';
import FurnitureCard from '../components/FurnitureCard'
import CartContainer from './CartContainer.js'


export default class FurnitureContainer extends Component {

    renderItem = () => {
        return this.props.info.map(item => 
            <FurnitureCard key={item.id} info={item} addToCart={this.props.addToCart} />
        )
    }
    
    render() {
        return (
            <div className="furniture-container">
                {this.renderItem()}
                {/* {this.state.cart.length === 0 ? null : this.renderCart()} */}
            </div>
        )
    }
}

