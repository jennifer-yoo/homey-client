import React, { Component } from 'react';
import AccountCard from '../components/AccountCard'

export default class Account extends Component {

    state = {
        orders: []
    }

    componentDidMount() {
        fetch(`http://localhost:3001/orders/`)
        .then(resp => resp.json())
        .then(info => {
            this.setState({orders: info})
        })
    }

    renderExceptNew = () => {
        const orderId = localStorage.getItem("orderId")
        if (this.state.orders.filter(el => el.id === parseInt(orderId) && el.status === true)) {
        console.log("hitting renderExceptNew")
            let past = this.state.orders.filter(el => el.user_id === 1 && el.status === true).reverse()
            return past.slice(1).map(el =>
                <AccountCard key={el.id} order={el} />
            )
        }

    }
    //     let orders = this.state.orders.filter(el => el.user_id === 1 && el.status === true).reverse()

    //     return orders.map(el =>
    
    //         <AccountCard key={el.id} order={el} />
    //     )
    

    renderCurrentOrder = () => {

        const orderId = localStorage.getItem("orderId")
        let currentOrder = this.state.orders.filter(el => el.id === parseInt(orderId) && el.status === true)

        if (currentOrder !== []) {
        console.log("hitting render current")
            return currentOrder.map(el =>     
                <AccountCard key={el.id} order={el} />
            )
        } 
        
        // else {
        //     return past.slice(1).map(item => 
        //         <AccountCard key={item.id} order={item} />
        //     )
        // }
        
    }

    renderPastOrder = () => {
        let orders = this.state.orders.filter(el => el.user_id === 1 && el.status === true).reverse()

        console.log("hitting render past orders")
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
                <div className="order-container">
                    <p className="orders-header">Recent Orders</p>
                    <div className="order-info">
                        { this.props.order.length === 0 ? this.renderPastOrder() : 
                        <><p className="order-message">Your order was successfully placed!</p>
                        {this.renderPastOrder()} </>}
                    </div>
                </div>
            </div>
        )
    }
}