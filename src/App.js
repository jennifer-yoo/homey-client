import React, { Component } from 'react';
import "./App.scss";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './MainPage'
import FurnitureContainer from './containers/FurnitureContainer'
import NavBar from './Navbar.js'
import CartContainer from './containers/CartContainer'
import Payment from './components/Payment'
import Search from './components/Search'
import Account from './containers/Account'
import {Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


class App extends Component {

  state = {
    data: [],
    cart: [],
    orderId: null,
    order: [],
    search: []
  }

  componentDidMount () {
    fetch('http://localhost:3001/furnitures')
    .then(resp => resp.json())
    .then(info => {
      console.log(info)
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
      console.log("post order:", data)
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
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZJFDFDSKJFLDSJFSDJDSF012345678900000000000000000000000";
    
    for (let i = 0; i < 15; i++) {
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
        tracking: trackingNum,
        status: true
      })
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({ order: data })      
    })
  }

  filterHandler = (e) => {
    e.persist()
    const items = [...this.state.data]

    if (e.target.innerText === "Arm Chair") {
      let searched = items.filter(el => el.category === "Armchair")
      this.setState({ search: searched})
    } else if (e.target.innerText === "Sofa") {
      let searched = items.filter(el => el.category === "Sofa")
      this.setState({ search: searched})
    } else if (e.target.innerText === "Coffee Table") {
      let searched = items.filter(el => el.category === "Coffee Table")
      this.setState({ search: searched})
    } else if (e.target.innerText === "Media Unit") {
      let searched = items.filter(el => el.category === "Media Unit")
      this.setState({ search: searched})
    } else {
      this.setState({ search: items})
    }
  }

  stripePromise = () => {
    return loadStripe('pk_test_51Hbg3UEMlQgATMdomGZSHQOXmwpYxGN02K0oyw72Vw0oZORun9U5pXPacYdbdiYLlsoyHSxxarMbDvYXk6KBHJGA00hPzjVt4r');
  }

  render() {
    console.log('in app cart state:', this.state.cart)
    console.log('in app order state:', this.state.order)

    return (
      <Router className="router"> 
        <Elements stripe={this.stripePromise()}>
          <NavBar />
          <Route exact path='/' component={MainPage} />
          <Route path='/products' render={(routerProps) => (<FurnitureContainer {...routerProps} info={this.state.search} addToCart={this.addToCart} filterHandler={this.filterHandler} /> )} />
          <Route path='/search' render={(routerProps) => (<Search {...routerProps} filterHandler={this.filterHandler}/>)} />
          <Route path='/cart' render={(routerProps) => (<CartContainer {...routerProps} info={this.state.cart} removeFromCart={this.removeFromCart} updateHandler={this.updateHandler} checkOut={this.checkOut} order={this.state.order}/> )} />
          <Route path='/checkout' render={(routerProps) => (
              <ElementsConsumer>
                {({stripe, elements}) => (
                  <Payment {...routerProps} stripe={stripe} elements={elements} order={this.state.cart} checkOut={this.checkOut} orderTotal={this.state.orderTotal}/>
                )}
              </ElementsConsumer>
            )} />
          <Route path='/my-account' render={(routerProps) => (<Account {...routerProps} order={this.state.order}/> )} />
        </Elements> 
      </Router>
    );
  }
}

export default App;
