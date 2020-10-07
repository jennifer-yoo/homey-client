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
    cart: []
}

  componentDidMount () {
      fetch('http://localhost:3001/furnitures')
      .then(resp => resp.json())
      .then(info => {
          this.setState({data: info})
      })
  }

  addToCart = (id) => {
    fetch('http://localhost:3001/units', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'accept': "application/json"
        },
        body: JSON.stringify({
          furniture_id: id
        })
      })
    .then(resp => resp.json())
    .then(data => {
      this.setState({ cart: [...this.state.cart, data.furniture] })
    })
  }

  render() {
    console.log('in app:', this.state.data)
    return (
      <Router> 
        <div className='logo'>Homey</div>
        <NavBar />
        <Route exact path='/' component={MainPage} />
        <Route exact path='/design' component={Design} />
        <Route path='/products' render={(routerProps) => (<FurnitureContainer {...routerProps} info={this.state.data} addToCart={this.addToCart} /> )} />
        {/* <Route exact path='/products' component={FurnitureContainer} /> */}
        <Route path='/cart' render={(routerProps) => (<CartContainer {...routerProps} info={this.state.cart} /> )} />
      </Router> 
    );
  }
}

export default App;
