import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import FurnitureMainCard from '../components/FurnitureMainCard'
import FurnitureShow from '../components/FurnitureShow'
import Search from '../components/Search'

export default class FurnitureContainer extends Component {

    renderItems = () => {
        return this.props.info.map(el => 
            <FurnitureMainCard key={el.id} info={el}/>
        )
    }
    
    render() {
        const { info, changeHandler, addToCart } = this.props
        return (
            <div className="furniture-container">
                <Search />
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

