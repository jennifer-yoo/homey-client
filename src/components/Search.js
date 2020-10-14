import React, {Component} from 'react';
import { aidian } from '../images/aidian.png' // sofa
import { aula } from '../images/aula.png' // table
import { aveiro } from '../images/aveiro.png' // media
import { belgrave } from '../images/belgrave.png' // media
import { boone } from '../images/boone.png' // media
import { flippa } from '../images/flippa.png' // table
import frameBlue from '../images/frameBlue.png' // chair
import haruLightBlue from '../images/haruLightBlue.png' //sofa
import ivanChair from '../images/ivanChair.png' // chair
import simone from '../images/simone.png' // chair

export default class Search extends Component {

    state = {
        isHovering: false
    }

    hoverHandler = (e) => {
        e.persist()
        this.setState((previousState) => ({isHovering: !previousState.isHovering}))

        if (e.target.innerText === "Arm Chair") {
            let images = [{frameBlue}, {ivanChair}, {simone}]
            for (let i = 0; i < images.length; i++) {
                e.target.src = images[i]
            }
        } 
        // else if (e.target.innerText === "Sofa") {
        
        // } else if (e.target.innerText === "Coffee Table") {
            
        // } else if (e.target.innerText === "Media Unit") {
            
        // } else {
            
        // }
        
        // return (
        //         <div className="filter-preview">
        //             <img alt="filter-preview" src={simone}></img>
        //             <img alt="filter-preview" src={ivanChair}></img>
        //             <img alt="filter-preview" src={frameBlue}></img>
        //         </div>
        // )
    }

    render () {
        const { filterHandler } = this.props

        return (
            <div className="search-container">
                <div className="search-header">
                    <p name="all" onClick={(e) => filterHandler(e)}>All</p>
                    <p name="armChair" onClick={(e) => filterHandler(e)} onMouseOver={(e) => this.hoverHandler(e)} onMouseLeave={(e) => this.hoverHandler(e)}>Arm Chair</p>
                    <p name="sofa" onClick={(e) => filterHandler(e)}>Sofa</p>
                    <p name="coffeeTable" onClick={(e) => filterHandler(e)}>Coffee Table</p>
                    <p name="mediaUnit" onClick={(e) => filterHandler(e)}>Media Unit</p>
                </div>
                <div className="filter-pic-container">
                    { this.state.isHovering 
                        && 
                        <><img className="filter-pic1" alt="filter-preview" src={frameBlue}></img>
                        <img className="filter-pic2" alt="filter-preview" src={ivanChair}></img>
                        <img className="filter-pic3" alt="filter-preview" src={simone}></img></>
                    }
                </div>
            </div>
        )
    }
}

//export default Search;