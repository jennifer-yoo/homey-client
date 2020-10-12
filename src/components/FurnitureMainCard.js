import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


export default class FurnitureMainCard extends Component {

    render () {        
        const {info} = this.props

        return (
            <NavLink to={`/products/${info.id}`}>
                <div className="item-card">
                    <div className="item-info">
                        <img className="card-pic" src={info.image} alt={info.name}></img>
                        <p>{info.name}</p>
                        <p>${info.price}</p>
                    </div>
                </div>
            </NavLink>
        )
    }
}