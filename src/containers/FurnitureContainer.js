import React, { Component } from 'react';
import FurnitureCard from '../components/FurnitureCard'
import CartContainer from './CartContainer.js'


export default class FurnitureContainer extends Component {

    // state = {
    //     cart: []
    // }

    // addToCart = (id) => {
    //     fetch('http://localhost:3001/units', {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'accept': "application/json"
    //         },
    //         body: JSON.stringify({
    //             furniture_id: id
    //         })
    //     })
    //     .then(resp => resp.json())
    //     .then(data => {
    //         this.setState({ cart: [...this.state.cart, data.furniture] })
    //     })
    // }

    renderItem = () => {
        return this.props.info.map(item => 
            <FurnitureCard key={item.id} info={item} addToCart={this.props.addToCart}/>
        )
    }

    renderCart = () => {
        return this.state.cart.map(item => 
            <CartContainer info={this.state.cart} />
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


// const FurnitureContainer = ({ info }) => (
//     <div>
//         <FurnitureCard key={info.id} info={info}/>
//     </div>
// )

// export default FurnitureContainer