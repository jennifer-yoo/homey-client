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
    orderId: null
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
      console.log("order id:", data.id)
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
        console.log(data)
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

    //   if (parseInt(quantity) === 1) {
    //     fetch('http://localhost:3001/units', {
    //       method: 'POST',
    //       headers: {
    //         "content-type": "application/json",
    //         "accept": "application/json"
    //       },
    //       body: JSON.stringify({
    //         order_id: orderId,
    //         furniture_id: foundId
    //       })
    //     })
    //     .then(resp => resp.json())
    //     .then(data => {
    //       this.setState({ cart: [...this.state.cart, data] })
    //     })
    //   } else {

    //     // let orderId = localStorage.getItem("orderId")
    //     let orderId = this.state.orderId

    //     fetch('http://localhost:3001/units', {
    //       method: 'POST',
    //       headers: {
    //         "content-type": "application/json",
    //         "accept": "application/json"
    //       },
    //       body: JSON.stringify({
    //         order_id: orderId,
    //         furniture_id: foundId
    //       })
    //     })
    //     .then(resp => resp.json())
    //     .then(data => {
    //       let array = []
    //       for (let i = 0; i < parseInt(quantity); i++) {
    //         array[i] = data
    //       }
    //       this.setState({ cart: [...this.state.cart, array] })        
    //     })
    //   }
    // }
  }


  removeFromCart = (obj) => {
    let cart = [...this.state.cart]
    let foundObjIndex = cart.findIndex(el => el.id === obj.id)
    console.log("remove:", foundObjIndex)
    let newCart = cart.splice(foundObjIndex, 1)

    console.log("new cart:", newCart)
    this.setState({ cart: cart})
  }

  // changeHandler = (event) => {
  //   console.log("i am changing")
  //   event.persist()
  //   event.preventDefault()
  //   this.setState(()=> ({[event.target.name]: event.target.value}))
  //   this.setState({ quantity: event.target.value})
  // }

  render() {
    console.log('cart:', this.state.cart)
    return (
      <Router> 
        <NavBar />
        <Route exact path='/' component={MainPage} />
        <Route exact path='/design' component={Design} />
        <Route path='/products' render={(routerProps) => (<FurnitureContainer {...routerProps} info={this.state.data} addToCart={this.addToCart} changeHandler={this.changeHandler}/> )} />
        <Route path='/cart' render={(routerProps) => (<CartContainer {...routerProps} info={this.state.cart} quantity={this.state.quantity} removeFromCart={this.removeFromCart} changeHandler={this.changeHandler}/> )} />
      </Router> 
    );
  }
}

export default App;
