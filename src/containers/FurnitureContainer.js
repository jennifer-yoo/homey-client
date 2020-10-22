import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import FurnitureMainCard from '../components/FurnitureMainCard'
import FurnitureShow from '../components/FurnitureShow'
import Search from '../components/Search'

export default class FurnitureContainer extends Component {

    state = {
        toggle: false
    }

    componentDidMount () {
        console.log("rerendering furn container")
    }

    renderItems = () => {
        return this.props.info.map(el => 
            <FurnitureMainCard key={el.id} info={el}/>
        )
    }

    clickHandler = (e) => {
        e.persist()
        this.setState((previousState) => ({toggle: !previousState.toggle}))
        console.log("i am clicking search btn:", this.state.toggle)
    }

    
    render() {
        const { info, changeHandler, addToCart, filterHandler } = this.props
        return (
            <div className="products-main">
                <div className="search-container">
                    <Search filterHandler={filterHandler}/>
                    
                </div>
                <div className="furniture-container">
                    <div className="furniture-items" >
                        <Switch>
                            <Route path="/products/:id" render={(routerProps)=> {
                                let id = parseInt(routerProps.match.params.id)
                                let foundItem = info.find((el) => el.id === id)
                                return <FurnitureShow info={foundItem} addToCart={addToCart} changeHandler={changeHandler}/>
                            }} />
                            <Route path="/products" render={() => this.renderItems()} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

