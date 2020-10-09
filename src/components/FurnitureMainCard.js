import React, { Component } from 'react';

export default class FurnitureMainCard extends Component {

    renderItems = () => {
        return this.props.info.map(el => 
            <div className="item-info">
                <img className="card-pic" src={el.image} alt={el.name}></img>
                <p>{el.name}</p>
                <p>${el.price}</p>
            </div>
        )
    }

    render () {        
        console.log(this.props.info)
        // const {info} = this.props
        return (
            <div className="item-card">
                {this.renderItems()}
                {/* <div className="item-info">
                    <img className="card-pic" src={info.image} alt={info.name}></img>
                    <p>{info.name}</p>
                    <p>${info.price}</p>
                </div> */}
            </div>
        )
    }
}