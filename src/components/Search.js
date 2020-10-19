import React from 'react';
import { NavLink , useRouteMatch} from 'react-router-dom';

import aidian from '../images/aidian.png' // sofa
import monterosso from '../images/monterosso.png' //sofa
import flippa from '../images/flippa.png' // table
import esme from '../images/esme.png' // media
import boone from '../images/boone.png' // media
import hooperBrown from '../images/hooperBrown.png' // table
import kameko from '../images/kameko.png' // table
import mobyGreen from '../images/mobyGreen.png' // sofa
import frameBlue from '../images/frameBlue.png' // chair
import ivanChair from '../images/ivanChair.png' // chair
import simone from '../images/simone.png' // chair

export default function Search(props) {

    // React.useEffect(() => {
    //     console.log("rerendering in searcg")
    // }, [])

    const hoverHandler = (e) => {
        e.persist()
        // this.setState((previousState) => ({isHovering: !previousState.isHovering}))

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

    // const styles = {};

    // styles.search = {

    // }
    
    const { filterHandler } = props
    let { path } = useRouteMatch()
    console.log("url in search:", path)
    //onMouseOver={(e) => this.hoverHandler(e)} onMouseLeave={(e) => this.hoverHandler(e)}

    return (
        <div className="search-links">
                <NavLink to="/products" onClick={(e) => filterHandler(e)}>All</NavLink>
                <NavLink to="/products" onClick={(e) => filterHandler(e)}>Arm Chair</NavLink>
                <NavLink to="/products" onClick={(e) => filterHandler(e)}>Sofa</NavLink>
                <NavLink to="/products" onClick={(e) => filterHandler(e)}>Coffee Table</NavLink>
                <NavLink to="/products" onClick={(e) => filterHandler(e)}>Media Unit</NavLink>
            
            {/* 
                <p name="all" onClick={(e) => filterHandler(e)}>All</p>
                <p name="armChair" onClick={(e) => filterHandler(e)}>Arm Chair</p>
                <p name="sofa" onClick={(e) => filterHandler(e)}>Sofa</p>
                <p name="coffeeTable" onClick={(e) => filterHandler(e)}>Coffee Table</p>
                <p name="mediaUnit" onClick={(e) => filterHandler(e)}>Media Unit</p> */}
            {/* <div className="filter-pic-container">
                { this.state.isHovering 
                    && 
                    <><img className="filter-pic1" alt="filter-preview" src={frameBlue}></img>
                    <img className="filter-pic2" alt="filter-preview" src={ivanChair}></img>
                    <img className="filter-pic3" alt="filter-preview" src={simone}></img></>
                }
            </div> */}

            {/* {toggle ? 
                <><div className="search-header">
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
                </div></>
                :
                null
            } */}
        </div>

    )
}

//export default Search;