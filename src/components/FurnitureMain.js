import React, { Component } from 'react';
import FurnitureMainCard from './FurnitureMainCard'
import FurnitureShow from './FurnitureShow'
import { Link } from 'react-router-dom'

export default class FurnitureMain extends Component {

    renderFurnitures = () => {
        const { info } = this.props
        return Object.keys(info).map(furnitureId =>

            //<FurnitureMainCard key={furnitureId} info={info}/>
            <Link key={furnitureId} to={`/furnitures/${furnitureId}`}>{info[furnitureId].name} </Link>
        )
    }

    render() {
        return (
            <div>
                {this.renderFurnitures()}
            </div>
        )
    }
}