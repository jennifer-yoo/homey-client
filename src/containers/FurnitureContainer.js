import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import FurnitureMainCard from '../components/FurnitureMainCard'
import FurnitureShow from '../components/FurnitureShow'
import Search from '../components/Search'
import { Link } from 'react-router-dom';


export default class FurnitureContainer extends Component {

    renderItems = () => {
        return this.props.info.map(el => 
            <FurnitureMainCard key={el.id} info={el}/>
        )
    }
    
    render() {
        const { info, changeHandler, addToCart, filterHandler } = this.props
        return (
            <div className="furniture-container">
                <Link to="/search">Search</Link>
                {/* <Route path='/search' render={(routerProps) => (<Search {...routerProps} filterHandler={filterHandler}/>)} /> */}
                <Switch>
                    <Route path="/products/:id" render={(routerProps)=> {
                        let id = parseInt(routerProps.match.params.id)
                        let foundItem = info.find((el) => el.id === id)
                        return <FurnitureShow info={foundItem} addToCart={addToCart} changeHandler={changeHandler}/>
                    }} />
                    <Route path="/products" render={() => this.renderItems()} />
                </Switch>
            </div>
        )
    }
}

