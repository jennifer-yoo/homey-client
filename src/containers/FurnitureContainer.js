import React, { Component } from 'react';
import CartContainer from './CartContainer.js'
import { Route } from 'react-router-dom';
import FurnitureMain from '../components/FurnitureMain'
import FurnitureMainCard from '../components/FurnitureMainCard'
import FurnitureShow from '../components/FurnitureShow'



export default class FurnitureContainer extends Component {

    // renderItem = () => {
    //     const { match } = this.props
    //     return this.props.info.map(item => 
    //         <Route path={`${match.url}/:furnitureId`} render={routerProps => <FurnitureMainCard {...routerProps} key={item.id} info={item} addToCart={this.props.addToCart} quantity={this.props.quantity} changeHandler={this.props.changeHandler}/>} />
    //     )
    // }
    
    render() {
        const { info, match } = this.props
        console.log("i am in furn container:", this.props.info)

        return (
            <div className="furniture-container">
                <FurnitureMain info={info} />
                <Route path={`${match.url}/:furnitureId`} render={routerProps => <FurnitureShow {...routerProps} info={info} addToCart={this.props.addToCart} quantity={this.props.quantity} changeHandler={this.props.changeHandler}/>} />
            </div>
        )
    }
}

