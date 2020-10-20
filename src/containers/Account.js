import React, { Component } from 'react';
import AccountCard from '../components/AccountCard'

export default class Account extends Component {

    state = {
        orders: [],
        show: false
    }

    componentDidMount() {
        // const orderId = localStorage.getItem("orderId")

        fetch(`http://localhost:3001/orders/`)
        .then(resp => resp.json())
        .then(info => {
            // let filtered = info.filter(el => el.user_id === 1)
            this.setState({orders: info})
        })

        setTimeout(()=> this.setState({show: true}), 5000) 
    }

    renderCurrentOrder = () => {
        const orderId = localStorage.getItem("orderId")

        let currentOrder = this.state.orders.filter(el => el.id === parseInt(orderId) && el.status === true)

        if (currentOrder !== []) {
            return currentOrder.map(el => 
                <div className="current-order">
                        <p>Your order was successfully placed!</p>
                        <AccountCard key={el.id} order={el} />
                 </div>
            )
        }
    }

    renderPastOrder = () => {
        let orders = this.state.orders.filter(el => el.user_id === 1 && el.status === true).reverse()

        return orders.map(el =>
            <AccountCard key={el.id} order={el} />
        )
    }

    render() {
        console.log("in account:", this.state.orders)
        console.log("state from app, now in account:", this.props.order)
        return (
            <div className="account-container">
                <p className="account-header">Your Account</p>
                    { this.state.show ? this.renderCurrentOrder() : null }
                <div className="past-orders">
                    <p className="past-header">Past Orders</p>
                    {this.renderPastOrder()}
                </div>
            </div>
        )
    }
}