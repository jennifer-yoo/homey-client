import React, { Component } from 'react';
import "./App.scss";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './MainPage'
import Design from './components/Design'
import FurnitureContainer from './containers/FurnitureContainer'
import NavBar from './Navbar.js'
import CartContainer from './containers/CartContainer'

class App extends Component {

  state = {
    data: [],
    cart: [],
    orderId: null,
    order: []
  }

  componentDidMount () {
    fetch('http://localhost:3001/furnitures')
    .then(resp => resp.json())
    .then(info => {
        this.setState({data: info})
    })

    fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        user_id: 1
      })
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({ orderId: data.id})
      localStorage.setItem("orderId", data.id)
    })
  }

  addToCart = (obj, event, quantity) => {
    event.persist()
    event.preventDefault()

    const orderId = localStorage.getItem("orderId")
    let foundObj = [...this.state.data].find(el => el.id === obj.id)
    let foundId = foundObj.id
    let num = parseInt(quantity)

    if (num === 1 ) {
      fetch('http://localhost:3001/units', {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({
          order_id: orderId,
          furniture_id: foundId
        })
      })
      .then(resp => resp.json())
      .then(data => {
        this.setState({ cart: [...this.state.cart, data] })
      })
    } else {
      let array = []

      for (let i = 0; i < num; i++) {
        array[i] = foundObj

        fetch('http://localhost:3001/units', {
          method: 'POST',
          headers: {
            "content-type": "application/json",
            "accept": "application/json"
          },
          body: JSON.stringify({
            order_id: orderId,
            furniture_id: foundId
          })
        })
        .then(resp => resp.json())
        .then(data => {
          this.setState({ cart: [...this.state.cart, data] })        
        })
      }      
    }
  }

  removeFromCart = (unit) => {
    let currentCart = [...this.state.cart]
    let itemsArray = currentCart.filter(el => el.furniture_id === unit.furniture_id)
    let unitIds = itemsArray.map(el => el.id)

    for (let i = 0; i < unitIds.length ; i++) {
      fetch(`http://localhost:3001/units/${unitIds[i]}`, {
        method: "DELETE"
      })
    }

    let updatedCart = currentCart.filter(el => el.furniture_id !== unit.furniture_id)
    this.setState({ cart: updatedCart })
  }        

  updateHandler = (obj, event, quantity) => {
    event.persist()
    event.preventDefault()

    let cart = [...this.state.cart]
    let foundObj = cart.filter(item => item.furniture_id == obj.furniture_id)
    let unitIds = foundObj.map(el => el.id)

    console.log("i am in update obj, quantity:", obj, quantity)
    // let foundObjIndex = cart.findIndex(el => el.id === unit.id)
    // let newCart = cart.splice(foundObjIndex, 1)

    // console.log("new cart:", newCart)
    // this.setState({ cart: cart})
    
    if (parseInt(quantity) < foundObj.length) {
      let num = foundObj.length - parseInt(quantity)
      for (let i = 0; i < num ; i++) {
        fetch(`http://localhost:3001/units/${unitIds[i]}`, {
          method: "DELETE"
        })
      }
      if (num === 1) {
        let updatedCart = cart.filter(el => el.id !== obj.id)
        this.setState({ cart: updatedCart })
      } else {
        let updatedCart = cart.splice(-1, num)
        this.setState({ cart: updatedCart })
      }
    } else {
      const orderId = localStorage.getItem("orderId")
      let itemId = obj.furniture_id
      let num = parseInt(quantity) - foundObj.length

        for (let i = 0; i < num; i++) {
          fetch('http://localhost:3001/units', {
            method: 'POST',
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({
              order_id: orderId,
              furniture_id: itemId
            })
          })
          .then(resp => resp.json())
          .then(data => {
            this.setState({ cart: [...this.state.cart, data] })        
          })
        }
    }
  }

  checkOut = (totalAmount) => {
    const orderId = localStorage.getItem("orderId")

    let trackingNum = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (let i = 0; i < 12; i++) {
      trackingNum += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    fetch(`http://localhost:3001/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        total: totalAmount,
        tracking: trackingNum
      })
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({ order: data })        
    })
  }

  render() {
    console.log('in app cart state:', this.state.cart)
    console.log('in app order state:', this.state.order)

    return (
      <Router> 
        <NavBar />
        {/* <Route exact path='/' component={MainPage} /> */}
        <Route exact path='/design' component={Design} />
        <Route path='/products' render={(routerProps) => (<FurnitureContainer {...routerProps} info={this.state.data} addToCart={this.addToCart} /> )} />
        <Route path='/cart' render={(routerProps) => (<CartContainer {...routerProps} info={this.state.cart} removeFromCart={this.removeFromCart} updateHandler={this.updateHandler} checkOut={this.checkOut} order={this.state.order}/> )} />
      </Router> 
    );
  }
}

export default App;
