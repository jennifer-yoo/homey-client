import React, { Component } from 'react';
import CartCard from '../components/CartCard.js'
import Payment from '../components/Payment'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';


export default class CartContainer extends Component {

    renderItems = () => {
        let currentCart = [...this.props.info]
        let idArray = []
        let objArray = []

        for (const item of currentCart) {
            if (!idArray.includes(item.furniture_id)) {
                objArray.push(item)
                idArray.push(item.furniture_id)
                
            } else {
                idArray.push(item.furniture_id)
            }
        }
        return objArray.map(foundObj => 
            <CartCard key={foundObj.furniture_id} info={foundObj} cart={currentCart} removeFromCart={this.props.removeFromCart} updateHandler={this.props.updateHandler}/>
        )
    }

    orderTotal = () => {
        let prices = this.props.info.map(item => item.furniture.price)
        return prices.reduce((result,num) => result+num)
    }

    render() {    
        console.log("in cart state:", this.props.info, this.props.match)
        return(
            
            <div className="cart-container">
                <Router>
                        {/* <Route path={this.props.match.url} render={() => 
                        (console.log("this is my cart"),
                        <><h2>Your Cart</h2>
                            <div className="cart">
                                {this.renderItems()}
                            </div>
                            <div className="order-info">
                                {this.props.info.length === 0 ? 
                                    <p>There are no items in your cart</p>
                                    :
                                    <><p>Total: ${this.orderTotal()}</p>
                                    <Link to="/checkout">Continue to Checkout</Link></>
                                }
                            </div></>)
                        } /> */}
                            <>
                            <h2>Your Cart</h2>
                            <div className="cart">
                                {this.renderItems()}
                            </div>
                            <div className="order-info">
                                {this.props.info.length === 0 ? 
                                    <p>There are no items in your cart</p>
                                    :
                                    <><p>Total: ${this.orderTotal()}</p>
                                    <Link to="/checkout">Continue to Checkout</Link></>
                                }
                            </div></>

                        <Route path="/checkout" render={(routerProps) => <Payment {...routerProps} order={this.props.order} />} />
                </Router>
            </div>
        )
    }
}